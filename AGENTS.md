# KEDIS (Kesadaran Digital Sampah) - Web Design Project Rules

You are an expert front-end developer building "KEDIS", a static web application for the INVENTION 2026 National Web Design Competition. The project aligns with the subtheme "Going Green Through Smart Digital Solutions".

## 🚫 STRICT COMPETITION CONSTRAINTS (GUIDE BOOK WEB DESIGN SISWA INVENTION 2026.pdf)
1. **Static Website Only**: No back-end, no databases. Maximum of 7 pages total.
2. **JavaScript Rules**: Absolutely NO JavaScript frameworks/libraries allowed (No React, Vue, Angular, Svelte, etc.). 
3. **Allowed Scripts**: Only Vanilla JS and jQuery are permitted.
4. **CDN Usage**: Any framework or library used MUST utilize a CDN (Content Delivery Network). No local node_modules in production.
5. **No Templates**: Write clean, custom, and original code. Do not use pre-made website templates.

## 🎨 DESIGN & TYPOGRAPHY SYSTEM
- **Typography Pairing**: 
  - **Headings (H1, H2, H3, Hero Title)**: Use a modern, structured sans-serif display font (e.g., 'Space Grotesk' via Google Fonts) with tight line-height to give an editorial, magazine-meets-environment tone.
  - **Body Text, Buttons, UI Components**: Use a highly readable sans-serif font (e.g., 'Inter' via Google Fonts) to ensure clean legibility and a neutral feel.
- **Color Palette (Ecosia Theme)**:
  - Primary Accent: Lime Canopy (#d7eb80) for active buttons and brand accent.
  - Text & Outlines: Ink Black (#333333) for text, borders, and structural elements.
  - Background: Paper White (#ffffff) as the main canvas.
  - Card Surfaces: Warm Mist (#f8f8f6) and Linen Cream (#f0f0eb) for section backgrounds and card panels.
  - Secondary Text: Stone Gray (#6c6c6c) for subtext and descriptions.

## 📁 STRUCTURE & PAGES (Max 7 Pages)
1. `index.html` (Beranda - Campaign landing page)
2. `edukasi.html` (Eco-Learn - Interactive garbage category guide using jQuery tabs)
3. `kalkulator.html` (Eco-Monitor - Client-side JS waste carbon footprint calculator)
4. `komunitas.html` (Eco-Connect - Regional community hub based on dropdown filtering)
5. `game.html` (Eco-Play - Drag and drop waste sorting game saving highscore to localStorage)
6. `tentang.html` (About & Team Profile)
7. `artikel.html` (Kelas Edukasi & Artikel Upcycling Sampah Kreatif)

## 💻 CODE QUALITY
- Write Semantic HTML5 elements.
- Keep the code organized, well-commented, and maintain a clear folder structure (`/css`, `/js`, `/assets`).
- Ensure 100% responsiveness (Mobile-first design) using Tailwind CSS
- Game must be written in Vanilla JavaScript. NO libraries or frameworks (React, Vue, etc.).
- No database. Use localStorage for high scores.
- No server-side code. This is a static website for a competition.

## 🍃 RECENT DESIGN & CODE REFINEMENTS (DISTILLED ARCHITECTURE)
1. **Subpage Navigation Locking**: Maintain locked padding (`padding: 20px 32px !important`) and disable transitions on scroll for `.header-subpage` elements to prevent any layout shifts.
2. **Dropdown Interactions**: Eco-Learn navbar trigger uses a click-toggle listener via `#desktop-dropdown-trigger` instead of CSS hover to prevent cursor slipping.
3. **Botanical Styling System (Non-Monotonous Twigs)**: Decorate page backgrounds using three distinct, separate minimalist branch SVG structures rather than repeating a single layout:
   - *Drooping Willow* (thin weeping leaves)
   - *Symmetrical Fern* (neat round pairs)
   - *Broad Eucalyptus* (broad alternating circular leaves)
   - Color: Semi-translucent green (`text-[#43a047]/10`) to separate visually from the main lime canopy branches.
4. **DRY Carbon Calculator**: Keep calculation logic fully centralized in `js/main.js`. Do not write duplicate inline calculation scripts in HTML files.
5. **Bolder Card Accents**: Elevate interactive feedback by styling `.card-lift:hover` to scale up slightly and shift border color to solid Ink Black (`#333333`).

