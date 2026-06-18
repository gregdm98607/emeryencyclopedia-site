#!/usr/bin/env python3
"""
make_timeline.py — Reusable timeline renderer for the Encyclopedia of Emery County.

Reads a YAML event list and produces a PNG timeline that solves the label-overlap
problem suffered by the ad-hoc matplotlib scripts that produced the original
ch26-29 timelines (now in public/images/chapters/Rejected/).

Usage:
    python make_timeline.py <chapter_key>
    e.g. python make_timeline.py ch29

Looks for: tools/timelines/data/<chapter_key>.yaml
Writes to: public/images/chapters/<basename>.png

Design choices addressing the overlap failure mode:
1. Year + label rendered as one bordered block (so they move together).
2. Greedy lane assignment: dense regions auto-stack into multiple lanes.
3. adjustText simulated-annealing repels any residual overlap (y-only).
4. Hard-cap labels at 32 chars; overflow becomes a numbered footnote.
5. Connectors drawn AFTER adjustText so lines hit the actual final label.
6. Standard canvas: 14.5x7 in @ 200 DPI = ~2900x1400 px.
7. Desert Scholarly palette is hard-coded so every chapter looks consistent.
"""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

import matplotlib.pyplot as plt
import yaml
from adjustText import adjust_text

# --- Desert Scholarly palette (matches src/styles/global.css) -------------
PALETTE = {
    "sandstone":     "#D4A574",
    "canyon_shadow": "#3B2F2F",
    "sage_green":    "#7A8B6F",
    "mesa_red":      "#A0522D",
    "sky_wash":      "#F7F3ED",
    "alkali_flat":   "#E8E0D4",
    "deep_sky":      "#2C5F7C",
    "coal_seam":     "#1A1A2E",
    "muted_text":    "#7A7060",
    "border":        "#D1C7B8",
}

LABEL_CAP = 32
DENSITY_WINDOW = 12
MAX_LANES = 6
LANE_BASE = 1.6
LANE_STEP = 1.7
CANVAS_W = 14.5
CANVAS_H = 7.0


@dataclass
class Event:
    year: int
    label: str
    category: str
    side: str | None = None
    footnote: str | None = None


def load_yaml(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def assign_lanes(events: list[Event]) -> dict[int, tuple[str, int]]:
    """
    Greedy lane assignment. Walks events left-to-right, alternating
    above/below by default. If a label would collide with an existing label
    on the same side+lane within DENSITY_WINDOW years, bump to the next lane.
    Falls through to the opposite side if all lanes on the preferred side are
    full.
    """
    placement: dict[int, tuple[str, int]] = {}
    occupied = {"above": [], "below": []}

    last_side = "below"
    for idx, ev in enumerate(events):
        if ev.side in ("above", "below"):
            preferred_sides = [ev.side, "above" if ev.side == "below" else "below"]
        else:
            this_side = "above" if last_side == "below" else "below"
            preferred_sides = [this_side, last_side]

        placed = False
        for side in preferred_sides:
            for lane in range(0, MAX_LANES):
                conflict = any(
                    abs(ev.year - y) <= DENSITY_WINDOW and l == lane
                    for (y, l) in occupied[side]
                )
                if not conflict:
                    placement[idx] = (side, lane)
                    occupied[side].append((ev.year, lane))
                    last_side = side
                    placed = True
                    break
            if placed:
                break

        if not placed:
            placement[idx] = ("above", MAX_LANES - 1)
            occupied["above"].append((ev.year, MAX_LANES - 1))

    return placement


def truncate_with_footnote(events: list[Event]) -> list[Event]:
    counter = 1
    for ev in events:
        if len(ev.label) > LABEL_CAP:
            ev.footnote = ev.label
            ev.label = ev.label[:LABEL_CAP - 4].rstrip(",;: ") + f"... [{counter}]"
            counter += 1
    return events


def render(spec: dict, out_path: Path) -> None:
    title = spec["title"]
    subtitle = spec.get("subtitle", "")
    source_line = spec.get("source", "")
    cats = {c["key"]: c for c in spec["categories"]}
    raw_events = spec["events"]

    events = sorted(
        [Event(year=int(e["year"]),
               label=e["label"],
               category=e["category"],
               side=e.get("side")) for e in raw_events],
        key=lambda e: e.year,
    )
    truncate_with_footnote(events)
    placement = assign_lanes(events)

    # ---- Canvas -----------------------------------------------------------
    fig, ax = plt.subplots(figsize=(CANVAS_W, CANVAS_H), dpi=200)
    fig.patch.set_facecolor(PALETTE["sky_wash"])
    ax.set_facecolor(PALETTE["sky_wash"])

    year_min = min(e.year for e in events) - 3
    year_max = max(e.year for e in events) + 3
    ax.set_xlim(year_min, year_max)

    max_lane = max(p[1] for p in placement.values()) if placement else 0
    y_extent = LANE_BASE + LANE_STEP * (max_lane + 1) + 1.5
    ax.set_ylim(-y_extent, y_extent)

    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.set_yticks([])
    ax.tick_params(axis="x", colors=PALETTE["muted_text"], length=4)
    for label in ax.get_xticklabels():
        label.set_color(PALETTE["muted_text"])
        label.set_fontsize(9)

    ax.axhline(0, color=PALETTE["sandstone"], linewidth=4, zorder=1, alpha=0.85)

    # ---- Markers + combined year/label blocks -----------------------------
    text_objects = []
    text_colors = []
    for idx, ev in enumerate(events):
        side, lane = placement[idx]
        sign = 1 if side == "above" else -1
        y_base = sign * (LANE_BASE + lane * LANE_STEP)

        color = cats.get(ev.category, {}).get("color") or PALETTE["canyon_shadow"]

        ax.scatter([ev.year], [0], s=64, color=color,
                   edgecolors=PALETTE["sky_wash"], linewidths=1.5, zorder=4)

        block_text = f"{ev.year}\n{ev.label}"
        t = ax.text(
            ev.year, y_base,
            block_text,
            ha="center",
            va="bottom" if sign > 0 else "top",
            fontsize=8.2,
            color=PALETTE["canyon_shadow"],
            linespacing=1.2,
            bbox=dict(
                boxstyle="round,pad=0.35",
                facecolor=PALETTE["sky_wash"],
                edgecolor=color,
                linewidth=1.1,
            ),
            zorder=6,
        )
        text_objects.append(t)
        text_colors.append(color)

    # ---- Title block ------------------------------------------------------
    fig.suptitle(title, fontsize=14, fontweight="bold",
                 color=PALETTE["canyon_shadow"], y=0.97)
    if subtitle:
        ax.set_title(subtitle, fontsize=10.5, color=PALETTE["muted_text"],
                     pad=14, style="italic")

    # ---- Legend -----------------------------------------------------------
    handles = []
    for c in spec["categories"]:
        handles.append(plt.Line2D([0], [0], marker="o", linestyle="",
                                  markersize=8,
                                  markerfacecolor=c["color"],
                                  markeredgecolor=PALETTE["sky_wash"],
                                  label=c["label"]))
    ax.legend(handles=handles, loc="upper center",
              bbox_to_anchor=(0.5, -0.10),
              ncol=min(len(handles), 4), frameon=False,
              fontsize=9, labelcolor=PALETTE["canyon_shadow"])

    # ---- Footnotes + source ----------------------------------------------
    footers = []
    fn_index = 1
    for ev in events:
        if ev.footnote:
            footers.append(f"[{fn_index}] {ev.footnote}")
            fn_index += 1
    if footers:
        fig.text(0.5, 0.04, "\n".join(footers),
                 ha="center", va="bottom", fontsize=7.5,
                 color=PALETTE["muted_text"], style="italic")

    if source_line:
        fig.text(0.5, 0.012, source_line,
                 ha="center", va="bottom",
                 fontsize=7, color=PALETTE["muted_text"], style="italic")

    # ---- adjustText overlap pass -----------------------------------------
    adjust_text(
        text_objects,
        ax=ax,
        only_move={"text": "y", "static": "y", "explode": "y"},
        expand=(1.05, 1.5),
        force_text=(0.2, 0.7),
        arrowprops=None,
        max_move=25,
    )

    # ---- Connectors (drawn AFTER adjustText so they hit final pos) -------
    fig.canvas.draw()
    renderer = fig.canvas.get_renderer()
    for t, color in zip(text_objects, text_colors):
        bbox_disp = t.get_window_extent(renderer=renderer)
        bbox_data = bbox_disp.transformed(ax.transData.inverted())
        x_center = (bbox_data.x0 + bbox_data.x1) / 2
        y_target = bbox_data.y0 if bbox_data.y0 > 0 else bbox_data.y1
        ax.plot([x_center, x_center], [0, y_target],
                color=color, linewidth=1.0, alpha=0.45, zorder=2)

    plt.subplots_adjust(top=0.85, bottom=0.20, left=0.04, right=0.98)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_path, dpi=200, bbox_inches="tight",
                facecolor=PALETTE["sky_wash"])
    plt.close(fig)
    print(f"wrote {out_path}")


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: make_timeline.py <chapter_key>", file=sys.stderr)
        return 2
    key = argv[1]
    here = Path(__file__).parent
    yaml_path = here / "data" / f"{key}.yaml"
    if not yaml_path.exists():
        print(f"no data file at {yaml_path}", file=sys.stderr)
        return 1
    spec = load_yaml(yaml_path)
    out_basename = spec.get("out", f"{key}_opensource_timeline.png")
    out_path = here.parents[1] / "public" / "images" / "chapters" / out_basename
    render(spec, out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
