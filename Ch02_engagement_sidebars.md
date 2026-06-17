---
name: ch02-engagement-sidebars
description: "Engagement sidebar documentation for Chapter 2 — Deep-Time Geology"
metadata:
  type: project
title: "Chapter 02 — Deep-Time Geology: Engagement Sidebars and Activities"
chapter: 2
kind: engagement
tags: [geology, San-Rafael-Swell, dinosaurs, Emery-County, Cleveland-Lloyd]
status: draft
created: 2026-06-17
sidebar_count: 8
activity_count: 2
scavenger_hunt_items: 6
topic: "Chapter 02 — Deep-Time Geology: Engagement Sidebars and Activities"
---

# Chapter 2 — Deep-Time Geology: Engagement Sidebars

All engagement content is embedded inline in [ch02.mdx](src/content/chapters/ch02.mdx) using the standard Astro components. This file documents placement rationale and authorial notes for each element.

---

## SIDEBAR 1: Factbox — "Emery County's Rock Record at a Glance"

**Component**: `<Factbox>`
**Location**: After Section 2.1 (The Stratigraphic Column)
**Purpose**: Converts the dense prose summary of formations into a scannable visual table. Establishes economic stakes early so readers understand *why* the geology matters before walking through 300 million years of it. The note at the bottom provides the human-scale "so what."

---

## SIDEBAR 2: TriviaCallout — Equatorial Pangaea / Sahara Dunes

**Component**: `<TriviaCallout>`
**Location**: After Section 2.3 (Paleozoic Seas and Shores), before the Figure 2.1 image
**Purpose**: The equatorial location fact is genuinely counterintuitive to anyone standing in the Utah desert. Anchors the Coconino Sandstone discussion with a tactile hook — the I-70 cliffs you drive through every day were a Permian sand sea.

---

## SIDEBAR 3: TriviaCallout — Cleveland-Lloyd Bone Density

**Component**: `<TriviaCallout>`
**Location**: After Section 2.5 (Morrison Formation / Cleveland-Lloyd paragraph)
**Purpose**: 12,000 bones + 75% *Allosaurus* is the chapter's most arresting fact. The "ongoing excavations" note gives readers agency — this is a living science story, not a closed case.

---

## SIDEBAR 4: PhotoAssignment — Navajo Sandstone Cross-Bedding

**Component**: `<PhotoAssignment>`
**Location**: After Section 2.5 (immediately following Sidebar 3)
**Purpose**: Gives visitors a specific photographic subject anchored to the chapter's most iconic formation. The "dunes taller than any building in Utah" scale cue is the kind of detail that makes a photo worth taking.

---

## SIDEBAR 5: TriviaCallout — Western Interior Seaway

**Component**: `<TriviaCallout>`
**Location**: After Section 2.6 (Cretaceous Seaway), before Section 2.7
**Purpose**: The "sail from Gulf to Arctic" image is the most memorable in the chapter. Placed at the close of the seaway section so it functions as a recap-by-image rather than a mid-section interruption. Connects directly to the grey badlands readers can see around Castle Dale today.

---

## SIDEBAR 6: FieldItinerary — San Rafael Swell Geology Drive

**Component**: `<FieldItinerary>`
**Location**: After Section 2.7 (Laramide Orogeny / San Rafael Swell), before Section 2.8
**Purpose**: The Swell is the structural centerpiece of the chapter; this itinerary is placed right after the section that explains why it exists. Converts the chapter's stratigraphy into a drivable sequence. GPS coordinates are for the I-70 milepost 129 rest area / Swell overlook, the natural starting point.

---

## SIDEBAR 7: ScavengerHunt — Read the Rocks

**Component**: `<ScavengerHunt>`
**Location**: After Section 2.9 (Miocene Uplift and Canyon Cutting)
**Purpose**: Section 2.9 explains how the landscape was sculpted — the scavenger hunt immediately invites readers to go observe the results. Six items range from easy (color-change between layers) to moderately challenging (identifying Mancos Shale vs. other grey rocks). All items are specific and observable without special equipment.

---

## SIDEBAR 8: FamilyActivity — Kitchen-Table Stratigraphic Column

**Component**: `<FamilyActivity>`
**Location**: After Section 2.10 (Quaternary / Modern Landscape), before Section 2.11
**Purpose**: Placed after the chapter's narrative arc concludes (Quaternary = present day) so it functions as a synthesis activity rather than an introduction. The "flip the jar" discussion question adds genuine pedagogical value — it asks kids to think about what an inverted column means, which is how geologists read cliff faces.

---

## Coverage Check

| Criteria | Met? |
|---|---|
| Every sidebar anchored to a specific section | Yes |
| At least one field/observation-based element | Yes (ScavengerHunt §2.9, FieldItinerary §2.7) |
| At least one activity accessible to a child under 12 | Yes (FamilyActivity and ScavengerHunt) |
| PhotoAssignment present | Yes (§2.5) |
| Factbox present | Yes (§2.1) |
| Sections without engagement | §2.2, §2.4, §2.8, §2.11, §2.12 — all secondary or reference sections |
