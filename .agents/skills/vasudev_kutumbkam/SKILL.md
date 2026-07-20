---
name: vasudev_kutumbkam
description: >
  Skill for maintaining, extending, and deploying the वासुदेव कुटुम्बकम् (Vasudhaiva Kutumbakam)
  awareness website — a single-page site spreading the vision of One Earth, One Family, One Government.
  Triggers on tasks related to: adding content (quotes, references, statistics, benefits),
  updating the website sections, deploying to GitHub Pages, or extending the global unity vision.
---

# वासुदेव कुटुम्बकम् — Project Skill

## Project Identity

**Name:** Vasudhaiva Kutumbakam — One Earth, One Family  
**Mission:** Spread awareness of the benefits of global unity, one world, one humanity.  
**Sanskrit Origin:** *"अयं निजः परो वेति गणना लघुचेतसाम् | उदारचरितानां तु वसुधैव कुटुम्बकम् ||"*  
— Maha Upanishad, Chapter 6, Verse 71

## Project Location

```
d:\Vasudev Kutumbkam\
├── index.html      ← Full single-page website (7+ sections)
├── style.css       ← Dark cosmic design system
├── script.js       ← Animations, carousel, counters, parallax
├── earth.png       ← AI-generated hero Earth image
└── .gitignore
```

**GitHub Repo:** https://github.com/alokjaiss/vasudev_kutumbkam  
**Live URL:** https://alokjaiss.github.io/vasudev_kutumbkam/  
**Kanban Board:** https://github.com/users/alokjaiss/projects/3  
**Branch:** `main` — GitHub Pages serves directly from root of `main`

## Development & Contribution Workflow (Issue → PR → Kanban)

To maintain structured collaboration and track feature progress on GitHub, follow this workflow for all changes:

### 1. Issue Tracking & Kanban
- Check existing GitHub Issues or create a new issue for any bug, feature, or content addition.
- Link issues to the [Vasudev Kutumbkam — One Earth Roadmap Project Board](https://github.com/users/alokjaiss/projects/3).
- Move cards across columns (`Todo` → `In Progress` → `Done`) as work progresses.

### 2. Branching & Pull Requests (PR)
- Create a dedicated feature branch for the issue:
  ```powershell
  git checkout -b feature/issue-#-short-description
  ```
- Implement changes and commit with meaningful messages (e.g., `feat: Add social sharing buttons (#4)`).
- Push the feature branch and create a Pull Request against `main`:
  ```powershell
  git push origin feature/issue-#-short-description
  ```

### 3. Review & Merge to Main
- Merge PR into `main` (closing the associated issue with `Closes #<issue-number>`).
- GitHub Pages auto-rebuilds and deploys the updated site from `main` in ~1 minute.

The GitHub token is stored in the remote URL. Do not expose tokens or secrets in commit messages or code.

## Website Architecture

The site is a **single HTML file** with vanilla CSS + JS. No frameworks, no build step.

### Sections (in order)

| ID | Section | Purpose |
|----|---------|---------|
| `#hero` | Hero | Sanskrit title, Earth, starfield, tagline |
| `#problem` | A Divided World | 4 animated stat counters |
| `#vision` | Imagine One Earth | 6 benefit cards |
| `#voices` | Voices of Unity | Auto-rotating quotes carousel |
| `#compare` | Divided vs United | Side-by-side comparison table |
| `#path` | The Path Forward | 5-phase timeline/roadmap |
| `#resources` | References & Resources | 4 categories of curated links |
| `#join` | Join the Movement | CTA + pledge button |

### Design System (CSS Variables in `:root`)

```css
--bg-primary: #050510       /* Deepest cosmic dark */
--accent-gold: #f0c040      /* Sanskrit titles, CTAs */
--accent-cyan: #40e0d0      /* Section labels, links */
--accent-purple: #a040ff    /* Accents */
--font-display: 'Playfair Display'   /* Headings, quotes */
--font-body: 'Inter'                 /* Body text */
```

### Key JavaScript Functions

| Function | Purpose |
|----------|---------|
| `initStarField()` | Canvas shooting stars on hero |
| `initScrollReveal()` | IntersectionObserver fade-in |
| `initCounters()` | Animated number counters on scroll |
| `initQuotesCarousel()` | Auto-rotating quotes with swipe |
| `initPledge()` | Pledge button + confetti burst |
| `initParallax()` | Hero Earth parallax on scroll |

## How to Add Content

### Add a New Quote

In `index.html`, find `id="quotes-track"` and add a new `<div class="quote-slide">`:

```html
<div class="quote-slide">
  <p class="quote-text">Your quote text here.</p>
  <p class="quote-author">Author Name</p>
  <p class="quote-role">Title / Description</p>
</div>
```

### Add a New Reference Link

In `index.html`, find the appropriate `<ul class="ref-list">` inside the correct `ref-category`, and add:

```html
<li class="ref-item">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="ref-link">
    <span class="ref-name">Resource Title</span>
    <span class="ref-desc">Brief description of what this resource contains.</span>
    <span class="ref-url">example.com</span>
  </a>
</li>
```

Categories available:
- 🏛️ **Organizations & Movements** — `reveal-delay-1`
- 📚 **Books & Manifestos** — `reveal-delay-2`
- 📊 **Research & Data** — `reveal-delay-3`
- ✨ **Inspiration & Perspectives** — `reveal-delay-4`

To add a **new category**, copy an entire `<div class="ref-category">` block and give it a new `reveal-delay-N` class. No CSS changes needed.

### Add a New Stat Card

In `index.html`, find `<div class="stats-grid">` and add:

```html
<div class="stat-card reveal reveal-delay-N" id="stat-UNIQUE">
  <span class="stat-icon">EMOJI</span>
  <div class="stat-number" data-target="NUMBER" data-prefix="$" data-suffix="M">0</div>
  <div class="stat-label">Label Text</div>
  <div class="stat-sublabel">Supporting context</div>
</div>
```

The counter animates automatically via `data-target`. Use `data-prefix` for currency, `data-suffix` for units.

### Add a New Vision/Benefit Card

In `index.html`, find `<div class="vision-grid">` and add:

```html
<article class="vision-card reveal reveal-delay-N" id="benefit-UNIQUE">
  <span class="vision-card-icon">EMOJI</span>
  <div class="vision-card-accent"></div>
  <h3 class="vision-card-title">Card Title</h3>
  <p class="vision-card-text">Description of this benefit of a unified world.</p>
</article>
```

## Content Guidelines

### Voice & Tone
- **Inspiring, not preachy** — invite people in, don't lecture
- **Data-backed** — every stat should be sourced (reference added to resources section)
- **Inclusive** — the vision embraces all cultures, languages, traditions
- **Poetic where appropriate** — this is a manifesto, not a report

### When Adding Quotes
- Prefer verified, well-attributed quotes
- Include thinkers from diverse backgrounds — not only Western voices
- Priority voices: philosophers, scientists, astronauts, spiritual leaders, poets

### When Adding References
- Prefer primary sources (original organizations, academic papers, official data)
- Always include a short description so visitors know what they'll find
- Group correctly by category; create new categories when 3+ links share a theme

## Statistics to Keep Updated

| Stat | Current Value | Source |
|------|--------------|--------|
| Global military spending | $2.89 trillion (2025) | SIPRI |
| People chronically hungry | 673 million | UN FAO |
| Extreme poverty | 847 million | World Bank |
| Number of nations | 195 | UN |

Update these in `index.html` (the `data-target` attributes) and in this table when new data is available.

## Future Expansion Ideas

- [ ] Add a **"Timeline of Unity"** section — history of global cooperation milestones
- [ ] Add a **"Visionaries"** section with portraits/bios of key thinkers
- [ ] Add **language switcher** — Hindi, Sanskrit transliteration guide
- [ ] Add **newsletter/email signup** for updates
- [ ] Add **social sharing buttons** with pre-filled text
- [ ] Add **dark/light mode toggle**
- [ ] Consider **multilingual versions** starting with Hindi

## Related Concepts & Research Areas

- Vasudhaiva Kutumbakam (वासुदेव कुटुम्बकम्) — Maha Upanishad
- World Federalism — democratic global governance
- The Overview Effect — cognitive shift from seeing Earth from space
- Open Borders economics — Bryan Caplan's research
- Global Citizenship — Cosmopolitanism philosophy
- UN Sustainable Development Goals
- Pale Blue Dot — Carl Sagan's perspective
