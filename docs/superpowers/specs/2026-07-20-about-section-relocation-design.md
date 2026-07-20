# Design Spec: Relocation & Refinement of "Tentang KEDIS" Section

**Date:** 2026-07-20  
**Target File:** `c:\BELAJAR SMK\LOMBA\Kedis1\index.html`  
**Pattern:** Editorial Magazine Card Layout  

---

## 🎯 Goal & User Rationale
Relocate the "Tentang KEDIS" (About KEDIS) section from the top/middle area of `index.html` to the **bottom of the landing page** (right before the FAQ and Newsletter/Footer sections). Refine its copywriting and visual structure using the **Editorial Magazine Card** layout to present a clear, elegant narrative about the platform's origin, mission, and core pillars.

---

## 🎨 Visual & Layout Specification

### 1. Section Placement & Flow
- **Old Location:** Placed immediately after the Hero curve transition, before *Analisis Krisis*.
- **New Location:** Positioned at the bottom of the main content area (after *Jaringan Mitra Resmi* and before *FAQ Accordion* / *Newsletter*).
- **Page Reading Rhythm:**  
  1. **Hero** (First impression & search)  
  2. **Analisis Krisis** (The problem & urgency)  
  3. **Navigasi Pintar** (Interactive Eco-Diagnosis Tool)  
  4. **Langkah Kita** (3 Pillars: Eco-Learn, Eco-Connect, Eco-Play)  
  5. **Transparansi Gerakan** (Impact Donut Chart)  
  6. **Jaringan Mitra Resmi** (Partner Badges)  
  7. **Tentang Platform KEDIS** (`#tentang` - Merged origin, mission, & pillars card)  
  8. **Pusat Bantuan & FAQ** (`#faq`)  
  9. **Warta Mingguan & Footer**  

### 2. Component Design (`#tentang`)
- **Outer Shell:** Full-width section with `bg-ecoGreen` or `bg-paperWhite` backdrop, containing a centered max-w-7xl container.
- **Card Container:** `bg-warmMist rounded-card border border-ashBorder/30 p-8 sm:p-12 space-y-10 shadow-sm`.
- **Top Header Grid (2 Columns):**
  - **Left Column (40%):**
    - Eyebrow: `CERITA & VISI GERAKAN` (`text-stoneGray text-xs font-bold tracking-widest uppercase`).
    - Heading: `Tentang Platform KEDIS` (`font-display text-3xl sm:text-4xl font-bold text-inkBlack`).
    - Badge: `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07503f] text-white text-[10px] font-extrabold uppercase">Platform Digital Perkotaan</span>`.
  - **Right Column (60%):**
    - Paragraf 1: Narrative on how KEDIS started from concerns over overflowing landfills and the necessity of sorting waste at home.
    - Paragraf 2: Explanation of KEDIS as a smart digital platform combining educational guides, carbon footprint reduction estimates, interactive 2D arcade games, and community waste bank connections.
- **Bottom Pillars Row (3 Columns):**
  - **Card 01:** `01 / Pemilahan Mandiri` — Panduan langkah demi langkah memisahkan sisa dapur & plastik.
  - **Card 02:** `02 / Jaringan Komunitas` — Koneksi langsung ke 48+ Bank Sampah & Relawan lokal terverifikasi.
  - **Card 03:** `03 / Gamifikasi Interaktif` — Uji pemahaman pemilahan melalui game arcade 2D interaktif.

---

## 🛠️ Navigation & Script Integration
- Smooth scrolling link `href="#tentang"` will target the new section seamlessly.
- Header and footer navigation links on all subpages (`edukasi.html`, `komunitas.html`, `artikel.html`, `game.html`) will continue pointing to `index.html#tentang`.
