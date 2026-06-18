# EEC Table Authoring Standards

Tables in the Encyclopedia of Emery County must be styled, responsive, and on-brand. Three patterns are available — pick the simplest one that meets your needs.

---

## Pattern 1 — Plain Markdown Pipe Table (default)

Use for any reference table in chapter prose. No component needed — `global.css` styles it automatically.

```markdown
| Location | Habitat | Primary Targets | Access |
|---|---|---|---|
| The Wedge Overlook | Open sagebrush + canyon rim | Pronghorn, raptors, mule deer | 13 mi gravel from SR-10 N of Castle Dale |
```

**When to use:** Most tables. Comparison grids, hotspot lists, seasonal calendars, species inventories.

**Rendered:** zebra-striped rows, sandstone header tint, 2px warm border under header, `font-size: 0.875rem`, horizontally scrollable on mobile.

---

## Pattern 2 — DataTable Component (captioned/annotated table)

Use when the table needs a formal caption (table number) or a source/note line below.

```mdx
<DataTable
  caption="Table 34-A — Wildlife Hotspots of Emery County"
  note="All sites on public land unless marked (P) for private. Road conditions vary seasonally."
>

| Location | Habitat | Primary Targets | Access |
|---|---|---|---|
| The Wedge Overlook | Open sagebrush + canyon rim | Pronghorn, raptors, mule deer | 13 mi gravel from SR-10 N |

</DataTable>
```

**Props:**
- `caption` — displayed above the table in display-font (Libre Baskerville), small caps style
- `note` — displayed below in muted italic, separated by a hairline rule
- `id` — optional anchor ID for cross-references (`<CrossRef chapter={34} section="34.10" />`)

**When to use:** Tables cited by number in the text ("see Table 34-A"), or tables with a data source that needs attribution.

**Important:** Leave a blank line between the opening `<DataTable>` tag and the `|` table row — MDX requires this for markdown inside JSX slots to be parsed correctly.

---

## Pattern 3 — Factbox Component (structured data box)

Use for key facts that need to stand out from the prose as a sidebar element, not an inline reference table.

```mdx
<Factbox title="Joe's Valley Reservoir — Key Facts">
| Stat | Value |
|---|---|
| Surface area | ~1,100 acres |
| Max depth | ~110 ft |
| Primary use | Irrigation + recreation |
| Fish species | Rainbow trout, brown trout, yellow perch |
</Factbox>
```

See the Factbox component for full prop documentation. Use this for engagement sidebars, not for reference tables in the chapter narrative.

---

## Do Not Use

- Raw HTML `<table>` in MDX — maintenance burden, no design-token alignment.
- `<table style="...">` inline styles — breaks theming.
- Tables inside `<blockquote>` — renders oddly; use Factbox or DataTable instead.

---

## Column Alignment Tips

Markdown pipe tables support alignment syntax but the default (left-aligned all columns) is correct for EEC tables that mix text and data. Only use center/right alignment when the column is purely numeric:

```markdown
| Site | Elevation (ft) | Area (acres) |
|---|---:|---:|
| Joe's Valley Res. | 6,800 | 1,100 |
```

---

## Long Cell Content

If a single cell contains long text that would make the table hard to scan, consider:
1. Breaking the table into two smaller tables with sub-headings
2. Moving the long content to a prose paragraph with a Trivia Callout or Factbox sidebar
3. Using a `<dl>` definition list in HTML rather than a table
