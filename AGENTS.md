# Project Overview

**Imam Ariadi Portfolio** — a personal portfolio website built with **React 18 + Vite**, migrated from a static HTML/Bootstrap 4 site. Showcases projects, blog articles, services, and interactive statistics charts. Uses React Router for multi-page navigation (`/`, `/all-projects`, `/all-blogs`).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (JSX, Hooks) |
| Build | Vite 4 |
| Routing | react-router-dom v6 |
| CSS Framework | Bootstrap 4 (legacy CSS via `public/assets/css/`) |
| Icons | Font Awesome 4, Simple Line Icons |
| Animations | AOS (IntersectionObserver custom impl), WOW.js, CSS keyframes |
| Particle Effect | particles.js (with CSS fallback) |
| Carousel | Owl Carousel |
| Lightbox | Nivo Lightbox |
| Animation Engine | react-spring (installed, not heavily used) |
| GitHub Calendar | github-calendar |

---

## Project Structure

```
My-Portfolio/
├── index.html                  # Vite HTML entry, loads Bootstrap/FontAwesome/particles.js from /assets
├── package.json
├── vite.config.js              # dev port 3000, output to dist/
├── public/
│   ├── assets/                 # Legacy CSS/JS/fonts/images (Bootstrap, particles.js, wow.js, etc.)
│   ├── img/                    # Project images
│   └── komponen/               # PDF (CV)
├── src/
│   ├── main.jsx                # React entry, renders <AppRouter />
│   ├── AppRouter.jsx           # BrowserRouter with 3 routes
│   ├── App.jsx                 # Root layout (Preloader → Navbar → sections → Footer)
│   ├── index.css               # Global CSS variables + all component styles (2742 lines)
│   ├── styles.css              # Statistics section styles (920 lines)
│   ├── data/
│   │   ├── portfolioData.js    # portfolioData, allPortfolioData, portfolioCategories, services
│   │   ├── projectData.js      # projectStats, monthlyData, techStats, projectCategories, testimonials
│   │   └── blogData.js         # blogData, blogCategories
│   ├── hooks/
│   │   └── useScrollEffects.js # useScrollPosition, useScrollAnimation custom hooks
│   └── components/
│       ├── Preloader.jsx       # Loading screen (2s timer, fade-out transition)
│       ├── Navbar.jsx          # Sticky nav, scroll-aware background toggle
│       ├── HeroSection.jsx     # particles-js, animated headline (cd-headline clip), hero image
│       ├── ParticlesBackground.jsx  # CSS-only fallback particles
│       ├── ServicesSection.jsx  # Services grid from portfolioData
│       ├── Portfolio.jsx       # Featured portfolio (filter, cards, modal) + Portfolio.css
│       ├── PortfolioSection.jsx # Older portfolio component (unused in main app)
│       ├── BlogSection.jsx     # Blog cards, featured sorting, "View All" link
│       ├── ContactSection.jsx  # **Actually StatisticsSection** — project stats, charts, tabs, testimonials
│       ├── Footer.jsx          # Footer with quick links, WhatsApp quick message form, social links, back-to-top
│       ├── AllProjects.jsx     # /all-projects page (full portfolio grid, filter, modal) + AllProjects.css
│       ├── AllBlogs.jsx        # /all-blogs page (full blog grid, filter, modal) + AllBlogs.css
│       └── Portfolio.css       # Scoped styles for Portfolio.jsx (836 lines)
│       └── AllProjects.css     # Scoped styles for AllProjects.jsx
│       └── AllBlogs.css        # Scoped styles for AllBlogs.jsx
├── index-old.html              # Original static HTML backup
├── index-react.html            # Legacy React template (backup)
├── README.md
└── README-React.md             # Migration notes
```

---

## Design System

### Color Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `--primary-color` | `#28a745` | Buttons, borders, text highlights, brand accent (green) |
| `--primary-color-dark` | `#1e7e34` | Button hover, gradient end |
| `--primary-color-light` | `#34ce57` | Gradient stops, lighter accents |
| `--dark-bg` | `#000000` | Full-page background |
| `--text-light` | `#ffffff` | Primary text |
| `--text-muted` | `#cccccc` | Secondary/description text |
| `--border-color` | `#333333` | Card borders, dividers |
| Card surface | `#1a1a1a` | Portfolio card backgrounds |
| Surface overlay | `rgba(255,255,255,0.05)` | Subtle card/section backgrounds |

### Typography

- **Font family**: `'Poppins', sans-serif` (loaded via Google Fonts in `index.html`)
- **Headings**: Weight 600-700, sizes 24px-48px
- **Section titles**: 42-48px, gradient text fill (`linear-gradient` with `-webkit-background-clip: text`)
- **Body**: 14-16px, color `#cccccc`
- **Nav links**: Poppins, bold
- **Animated headline**: `.cd-headline.clip` style with rotating words

### Layout & Grid

- **Page max-width**: 1200px (Bootstrap container)
- **Sections**: Full-width `dark_bg` sections with 80px vertical padding
- **Portfolio grid**: CSS Grid — `repeat(auto-fit, minmax(350px, 1fr))` (responsive)
- **Modal**: Fixed overlay with centered card, 1fr 1fr split (image | info), collapses to single column on mobile
- **Footer**: 4-column Bootstrap grid

### Component Architecture

```
AppRouter (BrowserRouter)
├── / → App
│   ├── Preloader (2s, fade-out)
│   ├── Navbar (sticky, scroll-aware background)
│   ├── HeroSection (particles-js + animated headline)
│   ├── ServicesSection (3 cards)
│   ├── Portfolio (filter + cards + modal)
│   ├── BlogSection (3+3 featured posts)
│   ├── StatisticsSection / ContactSection (stats cards + 4 tabs)
│   └── Footer (links, WhatsApp form, back-to-top)
├── /all-projects → AllProjects
└── /all-blogs → AllBlogs
```

### Styling Strategy

- **CSS Variables** in `:root` for consistent theming
- **Legacy Bootstrap 4** classes mixed with custom CSS
- **Scoped CSS per component** (Portfolio.css, AllProjects.css, AllBlogs.css) — each using `-unique` suffixed class names to avoid collisions
- **Global styles** in `index.css` (2742 lines) and `styles.css` (920 lines)
- All styles use **dark theme** (`background: #000`, white/green text)

### Animation System

| Technique | Where |
|-----------|-------|
| **data-aos** (IntersectionObserver) | All sections — `fade-up`, `fade-right`, `fade-left` via custom AOS implementation in App.jsx |
| **WOW.js** | Legacy classes (`wow fadeInUp`, `wow flipInX`) — loaded dynamically in App.jsx |
| **CSS keyframes** | `cd-pulse` (cursor blink), `modalSlideIn`, `growUp`, `fillProgress`, `fadeInUp`, `shimmer`, `gradientShift`, `floatingDots` |
| **particles.js** | Hero section background (falls back to CSS-only animated grid + dots) |
| **Animated headline** | Custom `cd-headline clip` JS with word rotation every 3s |
| **Counter animation** | Stats numbers animate from 0 → final value over 2s |
| **Hover effects** | Card transform `translateY(-10px)`, overlay opacity, scale image |

### Routing

- `/` — Main single-page app with anchor sections
- `/all-projects` — Full portfolio with filter + modal
- `/all-blogs` — Full blog list with filter + modal

### Data Layer

All content is static JSON in `src/data/`:
- **portfolioData.js** — Featured (3) + all portfolio items (`allPortfolioData`)
- **projectData.js** — Stats, monthly chart data, tech usage, categories, testimonials
- **blogData.js** — Blog posts with external article links

### Key Patterns to Follow

1. Use `-unique` suffixed class names in new component CSS files to avoid style conflicts
2. Reference CSS variables (`var(--primary-color)`) for consistent theming
3. Always import `index.css` which contains the root variables
4. Use `data-aos` attributes for scroll animations (already configured in App.jsx)
5. Portfolio modal pattern: overlay → modal → split layout (image | info) with image navigation
6. Add new routes in `AppRouter.jsx`, new components in `src/components/`, new data in `src/data/`
7. Keep styles in separate CSS files per component (already has Portfolio.css, AllProjects.css, AllBlogs.css)
8. Bootstrap 4 grid classes (`container`, `row`, `col-lg-*`, etc.) are available globally

### Dev Commands

```bash
npm run dev      # Vite dev server on port 3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
```
