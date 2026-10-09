# Bude Ioana Nicola — Portfolio Design System

Design system for the portfolio website of **Bude Ioana Nicola**, a 2nd-year architecture student (Facultatea de Arhitectură și Urbanism, Cluj-Napoca, 2025–2026). The site offers two ways to see the work:
1. **Editorial site**: home, a project index, one page per project and an about page, styled like an architecture magazine.
2. **Flip-book**: the 15 portfolio pages as a book you can leaf through. They are finished, pre-rendered images. **The site never redraws them.**

**Audience:** architecture professors and practices. **Brief:** minimal, lots of white space, neutral beige and brown taken from the portfolio, and a frame that never competes with the pages. The interface is bilingual (RO / EN) and the pages stay in Romanian.

## Sources
- `uploads/pdf-1791557397797-vwe9.pdf`: *AN 2_2025-2026_BUDE_IoanaNicola_Portofoliu studențesc.pdf*. 15 pages, A4 landscape (842×595 pt), made in Canva. Copied to `assets/portofoliu-bude-ioana-nicola.pdf` for the download button.
- `uploads/AN 2_…_Portofoliu studențesc.png`: a 330×328 crop of the street cross-section on p.14.
- The flipbook reference screenshot mentioned in the brief was **not provided**.
- `tools/render.html` is the helper that rendered the PDF to `assets/pages/page-01…15.jpg` (1848×1307).
- `assets/projects/*.jpg`: 32 crops of single drawings, models and renders cut from those page renders, at roughly the native resolution of the images embedded in the PDF. They are named `NN-type-what.jpg`.
- The concept texts on the project pages are taken verbatim from PDF pp. 3, 4 and 7. Small typos were fixed: „creem” → „creăm”, „coherență” → „coerență”, „in” → „în”. The EN versions are translations.

### Portfolio structure (from the PDF)
| p. | Content |
|---|---|
| 01 | Cover: "Portofoliu studențesc", name, An 2, Grupa 1121, FAU Cluj-Napoca |
| 02 | Cuprins (contents) |
| 03–06 | **01** Proiectare de arhitectură 3: Inserție în așezare rurală, Moigrad Porolissum |
| 07–11 | **02** Proiectare de arhitectură 4: Concursul CASA |
| 12–13 | **03** Ambient: Colecții |
| 14 | **04** Lucrări opționale: Bazele proiectării de urbanism |
| 15 | **05** Elemente de construcții |

## Content fundamentals
- **Voice:** academic, descriptive and third-person ("Satul Moigrad se dezvoltă pe un relief fragmentat…"). The interface itself says almost nothing. Labels are nouns or imperative verbs ("Cuprins", "Descarcă PDF", "Deschide portofoliul").
- **Address:** no "I" and no "you" in the chrome. Hints are short infinitive or imperative forms ("Glisează pentru a răsfoi" / "Swipe to browse").
- **Casing:** sentence case for titles, as in the PDF ("Proiectare de arhitectură 3"). Small UI labels are UPPERCASE with +0.16em tracking. The name is always written in full, surname first: **Bude Ioana Nicola**.
- **Numbers:** sections are always two digits, 01–05. Pages are zero-padded too: "03 / 15", "02–03 / 15".
- **Diacritics:** always correct Romanian (ă, â, î, ș, ț with comma-below). The PDF's contents page drops some ("Lucrari optionale"); the site uses the corrected forms.
- **Bilingual:** RO is the default and EN is a toggle. Section titles are translated in `data.js`.
- **No emoji, no exclamation marks, no marketing copy, no stats.**

## Site structure (ui_kits/portfolio-site/index.html, hash-routed)
- `#/` **Home**: full-bleed CASA exterior render, with a paper panel bottom-right holding the name, faculty and the two entries („Răsfoiește portofoliul” → book, „Vezi proiectele” → index).
- `#/proiecte` **Projects**: large title, a 01–05 index list and an asymmetric 12-column grid of the 5 project cards. Tweak: editorial or uniform grid.
- `#/proiecte/<id>` **Project** (`moigrad`, `casa`, `ambient`, `urbanism`, `constructii`): title, metadata, an optional full-bleed hero, the concept (lead plus two columns) and images grouped as Planșe, Secțiuni, Machete, Randări, Detalii and Colaj. Images open in the Lightbox. Below them come the „Vezi în carte” band (→ `#/carte/<page>`) and prev/next.
- `#/carte/<n>` **Book**: the original flip-book reader, unchanged.
- `#/despre` **About & contact**. Bracketed values are placeholders, shown with a dashed underline.
- CASA is marked „Proiect de echipă”. The teammates' names are placeholders in `data.js` (`team`).

## Visual foundations
- **Colour:** warm paper whites (`--paper-0 #fbfaf7`) behind the book. Text is in browns sampled from the model photos, timber interiors and sepia renders (`--brown-900 #2f2823` primary, `--brown-600 #6b5d52` muted). `--sand-300 #cbc2a2`, the beige behind the p.12 collage, is the only accent and is used sparingly (spacing samples, thumbnail). There are no saturated colours: the pages carry all of them.
- **Type:** the portfolio is set in **Canva Sans** (Regular and Bold, embedded in the PDF). The token is `--font-sans: 'Canva Sans', 'Noto Sans', …`. Noto Sans is loaded from Google Fonts as a stand-in (see Caveats). The name uses Light 300 at display size with tight tracking. Body text is 15/1.6.
- **Space:** generous. `--frame-margin` is clamp(16px, 4vw, 64px). The book takes the largest size that fits between a 64px header and a 96px toolbar. There is one chrome row top and one bottom, nothing at the sides.
- **Backgrounds:** flat paper only. No gradients, textures or full-bleed imagery in the frame; the cover image itself is the hero.
- **Book:** square-cornered pages, white underlay, one soft warm shadow (`--shadow-book`) and a 6% gutter shade at the spine. Page 1 (cover) and odd-total backs sit alone and the book slides to stay centred.
- **Editorial layer:** big Light-300 display type (up to 128px, −0.025em), tracked uppercase labels, 12-column grids with asymmetric offsets, and hairline rules marking each section. Images carry no frame and are never upscaled past 1.1× their native size (`Figure`). There are no cards.
- **Scroll motion:** `Reveal` fades elements in with a 24px rise over 900ms, once, staggered by 120ms between siblings. The home render fades in with a 1.04→1 settle over 2.6s. Pages cross-fade over 420ms. There is no parallax.
- **Motion:** the page turn is a 3D `rotateY` of a leaf around the spine over 800ms with `--ease-page` (ease-in-out), plus a shade that deepens on the turning face. UI motion uses 160–480ms `--ease-out`: fades, the side panel or sheet sliding in, a 4px lift on the cover on hover. No bounces and no scaling. `prefers-reduced-motion` collapses the durations.
- **Hover:** icon buttons get a sand-100 disc, text buttons turn clay, contents rows nudge 4px right and the trailing arrow moves 3px. **Press:** sand-200 disc on icon buttons, a 1px drop on text buttons.
- **Borders:** 1px hairlines (`--line #e6dfd1`, `--line-strong #cfc4b0`). They separate contents rows and the mobile toolbar. There are no cards anywhere.
- **Radii:** 0 for pages and panels, 2px for text buttons, pill-shaped for icon buttons. Nothing else is rounded.
- **Transparency and blur:** only the scrim behind the contents panel (`rgba(47,40,35,.28)`). No blur.
- **Imagery vibe (pages):** mostly white with fine grey linework, sepia and taupe model photography, warm timber interior renders, one black presentation sheet (p.6) and a few green site plans (p.14). The frame stays lighter and quieter than all of them.
- **Layout:** desktop shows the name at top left, the current section in the centre and RO/EN at the right; the book in the middle; the toolbar centred at the bottom. Contents open in a right-hand panel 440px wide. Mobile shows one page full-width with native scroll-snap swipe, the section caption under it, the toolbar docked at the bottom and contents as a bottom sheet.

## Iconography
- The PDF has **no icons**, so a minimal set was chosen for the viewer: **Lucide** loaded from CDN (`lucide-static@0.460.0`). The `Icon` component re-strokes each glyph to 1.25 so it matches the hairlines. *This is a substitution: flagged.*
- Glyphs: `arrow-left`, `arrow-right`, `arrow-up-right`, `list`, `menu`, `maximize`, `minimize`, `download`, `x`.
- No emoji, no unicode-character icons and no icon font.
- **Logo:** none exists in the sources. The name set in type is the mark, and none was drawn.

## Index
- `styles.css`: entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`
- `assets/pages/page-01…15.jpg`: portfolio pages. `assets/portofoliu-bude-ioana-nicola.pdf`: download.
- `guidelines/*.html`: foundation cards (Colors, Type, Spacing, Brand)
- `components/`: see below, each directory with a `*.card.html`
- `ui_kits/portfolio-site/`: `index.html` (full responsive site; tweaks: grid, scroll animations, book layout), `mobile.html` (all pages at 390px), `flipbook.html` (v1 standalone book with start screen), `HomePage.jsx`, `ProjectsPage.jsx`, `ProjectPage.jsx`, `AboutPage.jsx`, `Reader.jsx`, `StartScreen.jsx`, `ui.jsx` (shared helpers), `data.js` (pages, projects, image captions, RO/EN copy, contact placeholders)
- `thumbnail.html`, `SKILL.md`, `tools/render.html` (PDF → JPG helper)

## Components
- **core/**: `Button` (primary / outline / text), `IconButton` (ghost / outline / inverse, 44px), `Icon` (Lucide wrapper)
- **book/**: `FlipBook` (desktop page-turn spread or single), `SwipeViewer` (mobile one-page swipe), `PageCounter`
- **site/**: `SiteHeader` (sticky; phone version has a full-screen menu), `SiteFooter`, `ProjectCard`, `Figure` (image + caption, opens the lightbox), `Lightbox` (full-screen gallery), `ProjectPager` (prev/next project), `Reveal` (scroll fade)
- **navigation/**: `Toolbar` (prev · counter · next · contents · fullscreen · download · lang), `TableOfContents` (inline / right panel / bottom sheet), `LanguageToggle`

### Intentional additions
No component library existed in the sources, so the set was sized to the brief: a viewer needs these and nothing more. `Icon` wraps the Lucide CDN so glyphs stay thin and consistent.

## Caveats
- **Canva Sans** is proprietary and could not be extracted. Noto Sans is the stand-in.
- The flipbook reference screenshot never arrived, so the spread layout and turn effect follow a standard bound-book model.
- The image captions (Plan parter, Secțiune longitudinală…) are my reading of the drawings. Please check them.
- Projects 03–05 have no concept text in the PDF, so their pages show images only.
- The pages are rasterised at 1848px wide. Re-render larger with `tools/render.html` if sharper zoom is needed.
