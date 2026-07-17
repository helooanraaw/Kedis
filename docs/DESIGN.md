# KEDIS — Panduan Desain & Visual Sistem
> Sahabat Digital untuk Memulai Hidup Hijau bagi Pemula — Antarmuka berkonsep Editorial Magazine Spread dengan warna Warm Bone, aksen Vivid Lime, dan tipografi Cabin yang hangat.

---

## 🎨 1. Token Warna (Color Palette)

KEDIS menggunakan palet warna yang terinspirasi dari alam tropis untuk menghadirkan kesan hangat, bersih, dan ramah lingkungan tanpa kesan menakut-nakuti (no eco-anxiety).

| Nama Warna | Kode Hex | Penggunaan dalam Antarmuka |
| :--- | :--- | :--- |
| **Warm Bone** | `#f1efdf` | Warna dasar kanvas/latar belakang halaman. Lembut untuk mata dan memberikan kesan kertas majalah premium. |
| **Pure White** | `#ffffff` | Warna dasar kartu komponen, area konten utama, dan panel interaktif untuk kontras bersih di atas Warm Bone. |
| **Forest Ink** | `#07503f` | Warna navigasi utama, teks judul, tombol sekunder, dan footer. Memberikan bobot informasi yang solid. |
| **Vivid Lime** | `#e8fe85` | Warna aksen kejutan (highlight), status aktif, border sorotan, dan seleksi teks untuk menarik perhatian pengguna. |
| **Stone Gray** | `#6d6d6d` | Warna teks deskripsi sekunder dan salinan pembantu untuk menjaga hierarki visual yang nyaman dibaca. |

---

## ✍️ 2. Tipografi (Typography)

Sistem menggunakan font yang hangat dan ramah untuk menyampaikan pesan edukatif secara sabar.

*   **Cabin (Google Fonts)**: Font utama untuk body text, teks UI, tombol, dan display headline. Dipilih karena memiliki bentuk membulat lembut yang ramah, namun tetap sangat terbaca pada ukuran kecil.
*   **Space Grotesk** (jika digunakan): Digunakan pada angka-angka statistik besar dan label data untuk mempertegas kesan digital modern.

---

## 📐 3. Geometri & Spacing

*   **Geometri Pill-Shaped**: Seluruh tombol utama, input pencarian, dan badge tag menggunakan radius lengkung penuh (`rounded-full` / `radius 100-110px`).
*   **Radii Kartu**: Sudut kartu dan kontainer visual diatur pada tingkat kenyamanan medium (`rounded-2xl` atau 20px).
*   **Tanpa Shadow Kaku**: Mengikuti prinsip desain editorial majalah, KEDIS tidak menggunakan bayangan kotak tebal (`no box-shadows`). Kedalaman visual dicapai murni melalui kontras warna kontainer (Pure White di atas Warm Bone).
*   **Comfortable Spacing**: Menggunakan spasi yang lapang (ritme 40px-80px antar-seksi) agar mata pengguna dapat bernapas dan fokus pada konten edukatif.

---

## 🧩 4. Elemen Antarmuka Utama

1.  **Marquee Strip Vivid Lime**: Berada di paling atas halaman utama sebagai panel informasi berjalan (Live Trash Counter) untuk menarik perhatian instan.
2.  **Full-Bleed Hero**: Visual pembuka halaman utama menggunakan foto alam asli bertema hijau dengan overlay Forest Ink untuk memastikan teks kontras dan terbaca.
3.  **Quilted Grid Asimetris**: Penyusunan galeri aksi/ekosistem menggunakan tata letak asimetris untuk menciptakan ritme baca yang dinamis dan modern.
