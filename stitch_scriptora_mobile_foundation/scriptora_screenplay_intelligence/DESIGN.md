---
name: Scriptora Screenplay Intelligence
colors:
  surface: '#f9f9f8'
  surface-dim: '#dadad9'
  surface-bright: '#f9f9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#eeeeed'
  surface-container-high: '#e8e8e7'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#434655'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1f0'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#36455b'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d5d73'
  on-tertiary-container: '#c5d6f0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  heading:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  section_heading:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-medium:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
  secondary:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  navigation:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 1rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies an editorial, focused, and cinematic ethos tailored for screenwriters, showrunners, and story analysts. The target audience values deep cognitive immersion, pristine typography, and quiet digital craft over gratuitous visual noise.

The design movement combines **Minimalism** with subtle **Tactile Precision**. The UI recedes gracefully into the background to prioritize story architecture, character arcs, and script pages. Every visual cue communicates deliberateness:
- High typographic legibility with razor-sharp editorial hierarchy.
- Absolute avoidance of neon glows, cybernetic treatments, synthetic AI gradient washes, and high-saturation gimmickry.
- A physical paper-meets-celluloid quietness, utilizing warm ivory grounds, deep cinematic navies, and surgical cobalt accents to guide decisions without fracturing focus.

## Colors

The palette is engineered around calm legibility and restrained contrast:

- **Canvas & Background (`#FBFBFA`)**: A gentle, warm ivory-white base that eliminates glare during long writing and script breakdown sessions.
- **Surface & Containers (`#F8FAFC`, `#F1F5F9`)**: Neutral blue-grey surfaces providing gentle planar separation for cards, scene breakdowns, and inspector panels.
- **Primary Text & Headings (`#0F172A`)**: Deep, ink-rich midnight slate ensuring AAA contrast against ivory canvas.
- **Secondary / Metadata Text (`#64748B`)**: Balanced cool slate for scene headings, transition tags, act markers, and non-blocking metadata.
- **Primary Accent (`#1D4ED8`)**: A controlled, professional royal blue reserved solely for high-intent actions, focused states, and essential story beats.
- **Borders & Dividers (`#E2E8F0`)**: Low-contrast, hairline separation lines that prevent visual heaviness.

## Typography

The type system blends the contemporary, geometric structure of **Plus Jakarta Sans** for headlines and title sequences with the neutral, hyper-legible cadence of **Inter** for narrative copy, breakdowns, and UI metrics.

- **Display & Heading**: Used for project titles, act summaries, and major module headers. Negative letter-spacing keeps titles compact and authoritative.
- **Section Heading**: Identifies scene breakdowns, character dossier panels, and scene beat headers.
- **Body & Secondary**: Form the foundation for scene summaries, dialogue notes, and screenplay intelligence insights.
- **Caption**: Tracked slightly wide (`0.04em`) and uppercase for status badges, screenplay element categories (e.g., `INT.`, `EXT.`, `DISSOLVE TO:`), and timestamp telemetry.
- **Script Reading Mode**: For raw screenplay reading and writing blocks, standard monospaced rules (e.g. Courier Prime) apply within page margins, while all surrounding intelligence tools remain strictly framed by this typographic system.

## Layout & Spacing

This design system uses a mobile-first, content-dense fluid grid designed for handheld precision:

- **Mobile Viewports (< 640px)**: 4-column layout with 16px (`1rem`) gutters and a comfortable 16–20px (`1rem`–`1.25rem`) edge screen margin. Content cards and script list rows extend flush within side margins.
- **Tablet / Split Screen (640px – 1024px)**: 8-column layout with 20px gutters. Accommodates simultaneous script viewing alongside scene intelligence notes.
- **Desktop Canvas (> 1024px)**: 12-column structure centered with a maximum content container of 1200px.
- **Rhythm**: Standard 4px/8px incremental spacing scale. Inner component padding leverages `space-sm` (8px) and `space-md` (16px), preserving vertical compactness without compromising touch target integrity (minimum 44x44px for actionable zones).

## Elevation & Depth

Visual separation relies on **Tonal Layers** combined with **Low-Contrast Outlines** and whispers of ambient drop shadows:

- **Base Layer (Level 0)**: Ivory canvas `#FBFBFA`.
- **Card / Surface Layer (Level 1)**: Flat `#FFFFFF` or `#F8FAFC` backed by a razor-thin 1px border (`#E2E8F0`). A delicate ambient shadow (`0 1px 2px 0 rgba(15, 23, 42, 0.04)`) anchors elements to the canvas.
- **Floating Modals & Sheets (Level 2)**: Bottom sheets, character inspectors, and popovers use `#FFFFFF` with a layered ambient shadow: `0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`, framed with a 1px border (`#E2E8F0`).
- **Zero AI Glows**: Blurred color blobs, glowing gradients, and heavy drop shadows are prohibited. Depth must mirror physical index cards and pristine editorial stationery.

## Shapes

The design uses balanced, modern radii corresponding to Level 2 roundedness:

- **Standard Elements (inputs, buttons, pill chips)**: 8px (`0.5rem`) corner radius.
- **Cards & Containment Modules (`rounded-lg`)**: 12px to 16px (`0.75rem` to `1rem`) corner radius, softening the density of rich screenplay analytics.
- **Bottom Sheets & Modal Surfaces (`rounded-xl`)**: 20px to 24px (`1.25rem` to `1.5rem`) top border radii for comfortable thumb interaction on mobile devices.
- **Pill Tags**: Full radius (`9999px`) reserved for screenplay tag indicators, scene numbers, and script status chips.

## Components

### Buttons
- **Primary**: Solid background `#1D4ED8`, text `#FFFFFF`, 8px radius, height 44px, padding 0 18px. Subdued tap feedback (opacity 0.92, scale down to 0.98).
- **Secondary / Outline**: `#FFFFFF` background, 1px border `#E2E8F0`, text `#0F172A`. Hover/Active fills to `#F1F5F9`.
- **Tertiary / Ghost**: Transparent background, text `#64748B`, transitioning to `#0F172A` on press.

### Chips & Badges
- **Status / Act Chips**: 24px height, full-pill shape, padding 2px 10px. Background `#F1F5F9`, border 1px `#E2E8F0`, text `#0F172A` in `caption` weight.
- **Active Filter**: Background `#0F172A`, text `#FFFFFF`, border-free.

### List Rows & Scene Elements
- **List Rows**: Minimalist rows with 14px vertical padding, separated by `#E2E8F0` 1px bottom rules. Left side anchors a monospace scene/slugline identifier; right side hosts intelligence badges or duration telemetry. Active states shift background to `#F8FAFC`.

### Form Inputs & Script Inspectors
- **Text Inputs**: Height 44px, background `#FFFFFF`, border 1px `#E2E8F0`, text `#0F172A`. Focused state transitions border to `#1D4ED8` with no loud outer glow rings (use 1px solid ring or subtle `#1D4ED8` border width shift to 1.5px).

### Cards
- **Scene & Character Cards**: Background `#FFFFFF`, 12px or 16px border radius, 1px `#E2E8F0` outline. Internal padding `16px`. Provides clean, modular hierarchy with deep navy titles and slate metadata.

### Minimalist Bottom Navigation
- Fixed mobile bottom bar with height 60px (plus safe area inset). Background `#FFFFFF` with hairline top border `#E2E8F0`. 
- Tab icons render at 22px in `#64748B`, shifting to active state in `#1D4ED8` accompanied by a micro 4px circular dot indicator beneath the label.