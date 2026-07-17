# 🤖 Agents Core Memory: Platform Kedis

Document ini berfungsi sebagai pusat instruksi, batasan teknis, dan konteks aplikasi untuk memandu seluruh AI Agent dalam melakukan pembuatan, pembaruan, atau perbaikan kode pada platform **Kedis**.

---

## 📌 1. Identitas & Visi Produk
* **Nama Platform:** Kedis (Kesadaran Digital Sampah)
* **Kategori Solusi:** Going Green Through Smart Digital Solutions (Edukasi, Komunitas, & Gamifikasi)
* **Status Pengembang:** Solo Developer (Dikembangkan secara mandiri oleh satu orang)
* **Alur Psikologi UI/UX:** `Sadar (Beranda)` ➔ `Paham (Roadmap & Edukasi)` ➔ `Bertindak Bersama (Forum & Game)`

---

## 🛠️ 2. Batasan Teknis & Regulasi (WAJIB PATUH)
Setiap Agent wajib mematuhi batasan arsitektur koding tingkat kompetisi berikut:
* **Format Aplikasi:** Web Statis Murni (Maksimal 5 halaman utama).
* **Teknologi Utama:** HTML5, Tailwind CSS (Play CDN v4), dan jQuery (Play CDN).
* **Larangan Keras:** 
  * DILARANG menggunakan framework JavaScript modern seperti React, Vue, Angular, Svelte, Alpine.js, dll.
  * DILARANG menggunakan *build tools* atau proses kompilasi berbasis Node.js (`npm`, `node_modules`).
* **Penyimpanan Data:** Karena bersifat statis, seluruh data dinamis wajib direkayasa menggunakan *Mock Data* di memori browser (*Client-side rendering* atau memanfaatkan `localStorage`).

---

## 🎨 3. Pedoman Gaya & Estetika (Visual Token Locker)
Semua halaman baru wajib merujuk pada token visual dari `DESIGN.md`:
* **Warna Dasar Canvas:** Warm Bone (`#f1efdf`)
* **Warna Kartu/Komponen:** Pure White (`#ffffff`)
* **Warna Batang/Navigasi/Footer:** Forest Ink (`#07503f`)
* **Warna Aksen Kejutan:** Vivid Lime (`#e8fe85`)
* **Geometri Elemen:** Menggunakan bentuk melengkung penuh (*pill-shaped*) dengan `rounded-buttons` atau `radius 100-110px`.
* **Gaya Desain:** Editorial Magazine Spread, mengandalkan *comfortable spacing*, tipografi bersih, dan tanpa efek bayangan kaku (`no box-shadows`).

## 📋 4. Target Standar Kode untuk Agent
1. **Semantic HTML:** Selalu gunakan tag yang tepat (`<header>`, `<main>`, `<article>`, `<footer>`).
2. **Clean Code Utility:** Maksimalkan utilitas kelas Tailwind CSS v4 tanpa menumpuk *inline styles* yang tidak perlu.
3. **Pemisahan Skrip:** Letakkan seluruh skrip interaksi logika JavaScript/jQuery di bagian bawah dokumen sebelum penutup tag `</body>`.
4. **Komentar Kode:** Sertakan komentar penanda (`<!-- Section Name -->`) yang rapi di setiap blok baris kode untuk menjaga kualitas kerapihan struktur berkas.

## 📋 6. Pembaruan Alur Psikologis & UI-UX (INDEX.HTML UPDATE)
* **Perubahan Konsep:** Bagian bawah *Hero Section* pada `index.html` dirombak total mengikuti pedoman arsitektur **Solo Developer** dan **Editorial Design**. Fungsi "Daftar 100 Desa Sadar Digital" dihapus karena keterbatasan mock data. Sebagai gantinya, dibangun modul perkenalan singkat platform Kedis yang berfokus pada *Tujuan Utama* dan *Komponen Kunci*, dilengkapi navigasi *Breadcrumb* ke halaman edukasi (`roadmap.html`) dan forum (`forum.html`).
* **Penyesuaian Estetika Visual:**
    * Mengubah tipografi global dari *Inter* menjadi *Cabin* (Google Fonts) untuk nuansa yang lebih hangat.
    * Mengganti warna teks *pewter* (`#6d6d6d`) yang dingin dengan *forest-ink/75* (`#054f3f` with 75% opacity) agar seragam dengan palet warna utama aplikasi dan memenuhi standar kontras aksesibilitas (rasio > 4.5:1).
    * Menghapus dekorasi bayangan kotak (`box-shadow`) dari foto-foto galeri, diganti dengan kontras permukaan kartu (komponen putih di atas latar belakang bone).
    * Foto sampul galeri diganti dengan aset generik bertema alam Bali/gotong royong yang tersedia, memastikan elemen grafis pendukung mendukung kesinambungan tema pastoral.
* **Perubahan Fungsional:**
    * Modul "Galeri Aksi Lingkungan" dirombak total menjadi "Ekosistem Hijau Kedis" yang menampilkan 4 pilar inti: `Langkah Awal`, `Atur Sampah Dirumah`, `Komunitas & Relawan`, dan `Edukasi Digital`.
    * Mengganti tata letak grid standar dengan format `Quilted Grid Asimetris` (menggunakan `span-2` pada elemen tertentu) untuk menciptakan ritme visual yang dinamis sesuai prinsip desain editorial.
    * Menghapus semua data duplikat yang merujuk pada "100 Desa", menyisakan konten deskriptif yang fokus pada arahan psikologis (Sadar → Paham → Bertindak) dan navigasi ke halaman internal lainnya.