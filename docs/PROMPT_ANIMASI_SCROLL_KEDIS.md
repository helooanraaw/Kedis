Prompt terpisah, scope-nya CUMA sistem animasi scroll. Tidak menyentuh struktur section, urutan card, atau konten teks manapun. `docs/AGENTS.md` tetap referensi, jangan diedit.

## ATURAN KERAS (sama seperti prompt-prompt sebelumnya)

1. Satu varian animasi selesai + diverifikasi di browser dulu, baru lanjut varian berikutnya. Jangan pasang ke semua halaman sekaligus dalam satu batch.
2. Cuma vanilla JS (`IntersectionObserver`, sudah ada polanya di `js/main.js`) dan CSS murni. Tidak ada GSAP/AOS/ScrollTrigger/library animasi apapun.
3. Semua varian wajib nonaktif total kalau `prefers-reduced-motion: reduce` — bukan cuma diperlambat, benar-benar berhenti bergerak, konten tetap muncul penuh.
4. Class `.animate-on-scroll` yang sudah ada (fade-up) JANGAN dihapus atau diubah perilakunya — varian baru ditambahkan sebagai class terpisah, dipasang berdampingan sesuai target di bawah, bukan menggantikan yang lama.
5. Tidak menambah/mengubah teks, tidak memindah section, tidak mengubah struktur HTML di luar menambahkan class dan elemen wrapper yang diperlukan animasi itu sendiri.

---

## Vocabulary animasi — 5 varian, tiap satu untuk jenis konten spesifik

### `.reveal-fade` — SUDAH ADA, jangan diubah cara kerjanya
Tetap dipakai untuk: eyebrow label + heading, teks pendek (1-2 kalimat). **Perluas cakupan** ke halaman yang masih minim:
- `edukasi.html` cuma ada 3 titik `animate-on-scroll` — halaman ini panjang, harusnya tiap heading section (`Mengenal Sampah Organik`, `Dua Kategori Sampah Organik`, `Metode Pengolahan...`, dst di ketiga tab) dapat class ini.
- `artikel.html` juga cuma 3 titik — tiap card di grid "Daftar Panduan Kreatif" perlu masuk cakupan (lihat `.reveal-stagger` di bawah, ini lebih pas untuk grid card daripada fade biasa).
- **Kecuali:** paragraf panjang (contoh: paragraf B3 di `edukasi.html` sekitar baris 417-419, narasi "Kepedulian yang Memulai Aksi" di `tentang.html`) — JANGAN dikasih animasi apapun, biarkan muncul normal tanpa reveal.
- **Kecuali:** hero tiap halaman (`index.html:108`, dan H1 hero di `edukasi.html:101`, `komunitas.html:101`) — ini di atas fold, sudah kelihatan saat halaman kebuka, scroll-reveal tidak akan ke-trigger dengan benar. Biarkan pakai fade-in sekali saat load (kalau belum ada), bukan mekanisme scroll-reveal.
- **Kecuali:** wizard Eco-Diagnosis (`index.html` sekitar baris 275-320) — cukup 1 fade-up untuk card pembungkus, JANGAN animasikan tiap opsi satu-satu, nanti kesannya lag pas mau diklik.

### `.reveal-stagger` — BARU, untuk grid card
- **Target:** card fitur di homepage (Eco-Learn/Eco-Connect/Eco-Play, `index.html` sekitar baris 340-410), card artikel di `artikel.html` ("Daftar Panduan Kreatif"), card komunitas di `komunitas.html` ("Daftar Komunitas Aktif").
- **Cara:** tiap card fade+geser naik seperti `.reveal-fade`, tapi delay bertahap kiri-ke-kanan (atau atas-ke-bawah untuk list vertikal komunitas) sekitar 80ms per card — pakai `:nth-child()` di CSS atau index loop di JS, jangan hardcode delay per elemen manual.

### `.reveal-scale` — BARU, khusus foto/gambar
- **Target:** semua gambar di dalam card (foto card fitur, foto card artikel, foto krisis TPA di `index.html`).
- **Cara:** scale dari 98% ke 100% + fade, BUKAN geser posisi. Bedakan jelas dari `.reveal-fade` supaya foto kerasa "settle ke tempatnya", bukan "muncul dari bawah" kayak teks.

### `.reveal-count` — SUDAH ADA sebagian, perluas cakupan
- Sudah jalan untuk 3 Balitik krisis (`data-counter` di `index.html`) dan hasil kalkulator karbon (`co2-produced`, `trees-saved` di `js/main.js`).
- **Tambahkan** ke: angka 65% di donut chart (`index.html`, section "Distribusi Dampak Pengelolaan"), dan angka dampak di detail komunitas (`komunitas.html`, "150+ Relawan" / "850 Kg Terpilah"). Pakai `data-counter` attribute yang sudah ada polanya, tinggal tempel di elemen baru.

### `.reveal-horizontal` — BARU, cuma 2 titik ini, jangan dipasang di tempat lain
- **Titik 1:** `edukasi.html` sekitar baris 128-160, section "Dua Kategori Sampah Organik" — card "Unsur Hijau" (baris ~136) geser masuk dari kiri, card "Unsur Cokelat" (baris ~149) geser masuk dari kanan, ketemu di posisi akhirnya bersamaan.
- **Titik 2:** `index.html` 3 baris Balitik krisis (81% / 25x / 60%+) — geser masuk gantian: baris 1 dari kiri, baris 2 dari kanan, baris 3 dari kiri lagi (zigzag, bukan satu arah semua).
- Alasan cuma 2 titik: pola ini pas untuk konten yang strukturnya "dua sisi berhadapan" atau "list berurutan pendek". Dipasang di section naratif biasa malah bikin section sebelah-sebelahan gerak beda arah tanpa alasan jelas — jangan generalisir ke section lain.

### `.reveal-parallax` — BARU, untuk elemen dekoratif daun/ranting yang sudah ada
- **Target:** semua `<img src="assets/element/*.svg">` dekoratif (bukan ilustrasi fungsional seperti `TongSampahMerahKuningHijau.svg` di wizard — itu jangan disentuh). Contoh titik: `index.html:168, 262, 320, 322, 424, 450`, `game.html:133-135`.
- **Cara:** elemen ini bergerak sedikit lebih lambat dari konten di depannya saat scroll (translateY berbasis posisi scroll, vanilla JS `requestAnimationFrame`, bukan library parallax).
- **Catatan penting:** opsi "draw-in" (garis SVG gambar sendiri, efek sulur tumbuh) yang sempat dibahas **tidak bisa dikerjakan sekarang** — semua elemen ini dipasang sebagai `<img src="....svg">`, bukan `<svg>` inline. Animasi stroke-dashoffset cuma jalan di elemen `<svg>` inline yang path-nya bisa ditarget CSS/JS. Ubah puluhan `<img>` jadi inline SVG di banyak file itu perubahan besar dan berisiko kacau — skip dulu, parallax saja sudah cukup memberi kesan "hidup" tanpa risiko itu.

### `.reveal-step-highlight` — BARU, untuk pola bernomor yang berulang
- **Target:** Protokol "Cuci, Kering, Simpan" 3 langkah (`edukasi.html` sekitar baris 391-406), "Cara Ikut Serta" 4 langkah (`komunitas.html` sekitar baris 277).
- **Cara:** saat discroll, nomor langkah yang lagi sejajar area tengah layar membesar/menyala (opacity/scale naik), yang lain meredup. Pakai `IntersectionObserver` dengan threshold di tengah viewport, bukan scroll-position listener manual.
- Sengaja dipakai di 2 tempat ini karena pola bernomornya memang sudah ada dan berulang — satu bahasa visual dipakai ulang, situs kerasa nyambung antar halaman.

---

## VERIFIKASI FINAL

Per halaman yang disentuh, buka di browser dan cek:
1. Scroll dari atas ke bawah pelan — tiap jenis konten (heading, card, foto, angka, dekorasi) bergerak dengan gaya animasinya masing-masing sesuai daftar di atas, bukan seragam semua.
2. Hero dan wizard Eco-Diagnosis tidak ikut ter-reveal ulang saat discroll balik ke atas.
3. Paragraf panjang (B3, narasi Tentang) tampil normal, tidak ada delay/animasi.
4. Aktifkan `prefers-reduced-motion` di OS, reload tiap halaman — semua animasi berhenti, konten tetap lengkap tampil, tidak ada yang hilang/kosong.
5. Bandingkan struktur & posisi elemen dengan sebelum sesi ini — kalau ada yang bergeser di luar efek animasi itu sendiri, laporkan sebelum dianggap selesai.
