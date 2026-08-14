# Ember Studio — Design System

A warm, craft-focused design system for creative project-management tools. The aesthetic blends **terracotta warmth** with **modern minimalism**: soft earth tones anchor the interface while amber accents draw attention to actions and progress. Built for teams that value aesthetics alongside productivity. Both light and dark modes feel intentional, not just inverted. The overall mood is **calm, focused, and subtly luxurious**.

This repository is the source of truth for Ember Studio's visual language: color, type, spacing, elevation, reusable React components, and full-screen UI kits. An automated compiler bundles the components into a runtime library and indexes the tokens; consuming projects link the single root `styles.css` and pull components from the generated bundle.

---

## Sources & provenance

This system was authored from a comprehensive written brand specification ("Ember Studio"). The following external resources were referenced as input — explore them to build richer, more accurate designs:

- **GitHub:** `stark123-clrt/devoir-symfony` — https://github.com/stark123-clrt/devoir-symfony
  - _Note:_ GitHub was not connected during authoring, so this repository was **not** browsed. If it contains product code or brand assets, connect GitHub and re-run to fold them in. The current system is derived entirely from the written spec.

> No Figma files, slide decks, or local codebases were attached. If you have the real product UI (screens, components, logo files), share them and the UI kits + assets here can be made pixel-accurate rather than spec-faithful reconstructions.

---

## Content Fundamentals

How Ember Studio writes copy.

**Voice.** Calm, confident, and quietly warm — like a thoughtful studio lead, not a hype machine. We speak _to_ the user ("you", "your projects") and refer to the product as "Ember Studio" or "the studio". We avoid corporate filler and exclamation-driven enthusiasm.

**Tone by context.**
- _Empty states & onboarding:_ encouraging and human — "Nothing here yet. Start your first project when you're ready."
- _Actions & buttons:_ direct verb-first labels — "Create project", "Invite team", "Mark complete".
- _Errors:_ plain, non-blaming, with a way forward — "That file is too large (max 25 MB). Try compressing it first."
- _Success:_ understated, never confetti-loud — "Saved", "Invite sent".

**Casing.** Sentence case everywhere — headings, buttons, menu items, labels ("Create project", not "Create Project"). The only uppercase is the **overline / eyebrow** label style (11px, letter-spaced) used sparingly above section titles.

**Punctuation & length.** Short sentences. Periods on full sentences in body copy; **no** trailing periods on button labels, chips, or single-line captions. Oxford comma. Numerals for counts and dates ("3 tasks due", "Due Jun 12").

**Person.** Second person for instructions ("you"), first-person plural only in brand/marketing voice ("we built Ember Studio for…"). Never first-person singular.

**Emoji.** Not used in the product UI. Status is communicated with color + icon + words, never an emoji. (Marketing surfaces may use them very sparingly, but the default is none.)

**Vibe, with examples.**
- Eyebrow → Title → support is the signature copy rhythm: `WORKSPACE` / "Autumn Rebrand" / "12 of 18 tasks complete".
- Metadata is terse and lowercase-friendly: "edited 2h ago", "by Mara", "due soon".
- Favor concrete nouns over abstractions: "project", "task", "file", "review" — not "item", "entity", "asset" unless precise.

---

## Visual Foundations

The complete visual language. Specimen cards for each of these live in the **Design System** tab.

**Color.** A warm palette built on three pillars: **terracotta** (`#C2410C`) for everything interactive and active, **stone** neutrals (warm grays from `#FAFAF9` page down to `#1C1917` near-black text), and **amber** (`#F59E0B`) reserved for attention — notifications, new-item dots, badges. Semantic status uses warm-leaning green/orange/red. **Never** pure black or pure white; **never** cool or blue-tinted grays. Terracotta is for interaction only — never decoration — and only **one** primary terracotta CTA appears per view.

**Type.** The serif/sans contrast is the design's signature. **Playfair Display** (bold, letter-spacing `-0.02em`) for display and headings conveys craft and intentionality; **Source Sans 3** (regular 400 / semibold 600) for all body and UI text. **Fira Code** with ligatures for code. At most two weights on a single screen. Scale: Display 64 / Headline 48 / Section 28 / Subhead 20 / Body 16 / Small 14 / Caption 12 / Overline 11 (uppercase, tracked).

**Spacing.** A strict **4px grid**. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80. Component padding pairs vertical×horizontal (sm 8×12, md 12×16, lg 16×24). Sections breathe more as screens widen (24 → 32 → 48). Container max width 1200px with 24px gutters. Card grids gap 16 (mobile) → 24 (desktop).

**Corner radii.** Deliberate and never mixed within a kind: **4px** inline code & small badges, **8px** buttons/inputs/selects/dropdowns, **12px** cards/panels/modals/popovers, **9999px** avatars/chips/pills/progress bars.

**Cards.** Warm off-white surface (`#F5F5F4`) on a slightly lighter page, **1px** warm border (`#D6D3D1`), 12px radius, 16px padding — resting **flat** (no shadow at rest). On hover they lift **2px** and gain a soft, warm shadow (`0 4px 16px rgba(28,25,23,0.06)`). Project cards carry a **4px colored left stripe** matching the project's assigned color. Selected cards swap that stripe for a **terracotta** left border.

**Elevation & shadows.** All shadows are **warm-tinted** (built on `rgba(28,25,23,…)`), never neutral-black or cool. Hierarchy: cards (flat → soft hover shadow) < popovers (`0 8px 24px`) < modals (`0 24px 48px` + backdrop blur). Primary buttons gain a **warm terracotta glow** on hover (`0 4px 12px rgba(194,65,12,0.25)`). The top nav is transparent with backdrop-blur and gains a 1px bottom border only on scroll.

**Backgrounds.** Solid warm tones — **no gradients, no imagery, no textures or patterns** as background decoration. The warmth comes entirely from the palette, not ornament. Page is `#FAFAF9`; surfaces step up through `#F5F5F4` and `#E7E5E4`.

**Borders & dividers.** Hairline **1px** warm-gray (`#D6D3D1`) for card edges, input borders, dividers. Stronger stone (`#78716C`) only where emphasis is needed. Subtle dividers use `#E7E5E4`.

**Focus, hover & press states.**
- _Focus:_ a warm terracotta ring — `0 0 0 3px rgba(194,65,12,0.12)` — plus border turning terracotta on inputs.
- _Hover (primary):_ darken to burnt sienna (`#9A3412`) + warm glow shadow. _Hover (cards/rows):_ background steps to `#E7E5E4`, card lifts 2px.
- _Press:_ darker still, no scale-bounce — Ember Studio presses are calm (color change, not playful shrink/grow).

**Motion.** Restrained. 150ms for buttons and hovers, 300ms ease for progress-bar fills and expand/collapse. Standard easing `cubic-bezier(0.4,0,0.2,1)`. Gentle fades and height transitions — **no** bounces, springs, or infinite decorative loops.

**Transparency & blur.** Used purposefully, not decoratively: nav backdrop-blur on scroll, and modal backdrops (`rgba(28,25,23,0.40)` + 8px blur). Tints (terracotta/amber/status at low alpha) back active chips and status pills.

**Imagery vibe.** When photography is used it should read **warm** — golden-hour, earthy, natural light; avoid cool/blue or harsh high-contrast b&w. Imagery is content, never chrome.

**Layout rules.** Sidebar app shell: fixed **256px** sidebar (warm white, 1px right border) + fluid content. Active sidebar item gets a **3px terracotta left accent bar** with a warm tinted background. Tabs are underline-style: active = terracotta text + 2px bottom border; inactive = stone text.

---

## Iconography

**Icon set: [Lucide](https://lucide.dev).** No icon font or sprite was provided in source, so Ember Studio standardizes on Lucide — its clean, consistent **2px stroke** and gently **rounded** terminals match the calm, craft-minimal aesthetic. (This is a **substitution**: if the real product ships a custom icon set, share it and we'll swap Lucide out.)

- **Style:** outline / stroke only — no filled icons, no duotone. Stroke weight stays at Lucide's default 2px; don't mix in heavier or hairline icons.
- **Sizing:** 16px (inline with small/caption text, chips), 20px (default — buttons, list rows, nav), 24px (section headers, empty-state accents). Always on the 4px grid.
- **Color:** icons inherit text color via `currentColor` — stone for default/secondary, terracotta only when the icon is itself interactive or marks an active state. Status icons take their semantic color (success/warning/error).
- **Usage in this repo:** load from CDN — `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`, or use `<i data-lucide="check"></i>`. Components reference icons by name; don't paste raw SVG paths into component files.
- **Emoji / unicode as icons:** never. Status and meaning come from a Lucide glyph + color + words.

**Logo & brand marks** (in `assets/`):
- `logo-mark.svg` — the standalone ember glyph (two warm flame strokes: terracotta + amber). Use at ≥24px; clear space = the glyph's half-width on all sides.
- `logo-wordmark.svg` — ember mark + "Ember Studio" set in Playfair Display bold. Default for headers and nav.
- Place marks on the warm page/surface tones. Don't recolor the flame, don't add shadows or outlines, don't stretch.

---

## Repository index

**Foundations**
- `styles.css` — the single entry point consumers link. `@import` manifest only.
- `tokens/` — `colors.css`, `typography.css`, `fonts.css`, `spacing.css`, `radius.css`, `elevation.css`, `base.css`. CSS custom properties (base values + semantic aliases) and `@font-face` / font loading.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `assets/` — `logo-mark.svg`, `logo-wordmark.svg`.

**Components** (`components/<group>/` — each has `.jsx`, `.d.ts`, `.prompt.md`, and a `@dsCard` HTML)
- `forms/` — Button, IconButton, Input, Select, Checkbox, Switch
- `display/` — Card, Badge, Chip, Avatar, ProgressBar
- `navigation/` — Tabs
- `feedback/` — Dialog, Toast

Consume from the generated bundle: `const { Button, Card } = window.EmberStudioDesignSystem_c8a645`.

**UI kits** (`ui_kits/<product>/`)
- `app/` — the Ember Studio project-management app: sidebar shell, projects dashboard, project detail, new-project flow. See `ui_kits/app/README.md`.

**Other**
- `SKILL.md` — Agent-Skills-compatible entry point.
- `README.md` — this guide.

> The compiler discovers everything from file content and sibling relationships, not folder names. `_ds_bundle.js`, `_ds_manifest.json`, and `_adherence.oxlintrc.json` are generated — don't edit them.

## Caveats
- **Fonts** load via Google Fonts CDN `@import` (Playfair Display, Source Sans 3, Fira Code are exact matches — no substitution). They are not self-hosted binaries; for offline use, drop woff2 files in `tokens/fonts/` and replace the `@import` with `@font-face` rules.
- **Icons** are Lucide (CDN) — a substitution for any custom product icon set, chosen for its 2px stroke / rounded style.
- **Logo** is an original mark authored for this system (no source logo was provided).
- **Source repo** `stark123-clrt/devoir-symfony` was not browsed (GitHub not connected). The system is derived from the written brand spec.
