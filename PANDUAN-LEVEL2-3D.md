# PANDUAN LEVEL 2 — Karakter 3D sungguhan (GLB + Three.js)

## Bedanya dengan yang sekarang

| | Sekarang (Level 1) | Level 2 |
|---|---|---|
| Aset | Gambar PNG/WebP 2D | Model 3D `.glb` |
| Teknik | CSS perspective + rotateY/rotateX | WebGL / Three.js |
| Efek scroll | Miring + mengecil (2.5D) | **Berputar sungguhan**, bisa 360° |
| Bisa dilihat dari samping | Tidak (gambar pipih) | Ya |
| Ukuran | ±76 KB | ±2–8 MB (perlu dikompresi) |

---

## Konsekuensi yang perlu kamu tahu dulu

1. **Wajah tidak akan persis.** Avatar creator menghasilkan gaya **stylized/semi-kartun**, bukan foto realistis seperti Verto. Verto itu CGI buatan 3D artist berjam-jam — bukan hasil generate dari foto.
2. **Ada langkah yang harus kamu lakukan sendiri.** Saya tidak bisa mendaftar atau login ke layanan avatar atas namamu.
3. **Lebih berat.** Perlu kompresi Draco/Meshopt supaya tidak menggantung di PC kantor. Tetap bisa offline — saya akan host Three.js lokal, tanpa CDN.
4. **Perlu fallback.** PNG yang sekarang tetap saya pertahankan untuk perangkat lemah / `prefers-reduced-motion`.

---

## Langkah 1 — Buat avatar dari foto

Layanan yang tersedia (Ready Player Me lama sudah bermigrasi ke **Avatar SDK**):

1. Buka **https://avatarsdk.com** → cari **Metaperson / Avatar Creator**
   - Atau coba juga `https://demo.avatarsdk.com`
2. Pilih **Create avatar from photo / selfie**
3. Upload foto yang sama dengan yang kamu kirim ke saya
4. Tunggu generator selesai (±1–3 menit)
5. Sesuaikan: rambut, pakaian (pilih **suit / blazer** supaya mirip desain sekarang), warna kulit
6. **Export → GLB / glTF (.glb)**
7. Simpan file-nya, lalu kirim ke saya

> Kalau situsnya minta daftar, pakai email `hadidsareka@gmail.com`.
> Kalau ada biaya, **berhenti dulu dan kabari saya** — kita cari alternatif gratis.

### Alternatif kalau layanan di atas tidak bisa

- **Tripo / Meshy / Rodin** — image-to-3D, hasil lebih realistis tapi biasanya berbayar
- **Blender + foto** — gratis tapi butuh keahlian modelling manual
- **Model generic gratis** (dari Sketchfab / Khronos sample) — cepat, tapi wajahnya bukan kamu

---

## Langkah 2 — Kirim file ke saya

Kirim file `.glb` lewat Telegram. Saya akan:

1. Cek struktur model (mesh, material, rig, ukuran file)
2. Kompres dengan **gltf-transform** (Draco / Meshopt) bila perlu
3. Download & host **Three.js lokal** di `assets/three/` — tetap offline, tanpa CDN
4. Ganti `<img class="hero__char">` dengan `<canvas>` Three.js
5. Samakan pencahayaan: key light hangat + rim light teal supaya menyatu dengan gradient
6. Hubungkan rotasi ke **scroll** + **mouse**:
   - scroll 0 → menghadap depan
   - scroll ke bawah → berputar ke samping ±25–40°
   - mouse → rotasi halus ±8°
7. Tambah **idle breathing** + **auto-rotate lambat** saat tidak disentuh
8. Pertahankan PNG sebagai fallback
9. Uji ulang di desktop / tablet / HP (overflow, console error, fps)

---

## Langkah 3 — Hasil akhir

Setelah jadi, kamu dapat:
- Karakter **3D asli** yang bisa diputar mengikuti scroll
- Tetap **gratis** (GitHub Pages)
- Tetap **offline-capable** (semua aset lokal)
- Tetap **cepat** setelah dikompresi

---

## Pertanyaan yang perlu kamu jawab sebelum saya kerjakan

1. Avatar creator-nya **bisa diakses** dan **gratis**?
2. Kamu mau hasil **stylized** (avatar creator) atau Anda tetap mau cari yang **realistis** (biasanya berbayar)?
3. Boleh saya pakai PNG sekarang sebagai fallback kalau WebGL gagal?

---

## Catatan teknis buat saya (internal)

- Loader: `GLTFLoader` dari `three/examples/jsm/loaders/GLTFLoader.js`
- Kompresi: `gltf-transform optimize input.glb output.glb --compress draco`
- Renderer: `WebGLRenderer({ antialias:true, alpha:true })`, `setPixelRatio(min(dpr,2))`
- Camera: PerspectiveCamera fov 32, position z ≈ 3.2
- Scroll → `model.rotation.y = -0.45 * ease(progress)` (radian ≈ −26°)
- Mouse → `+= pointer.x * 0.14`
- Pause RAF saat hero tidak terlihat (IntersectionObserver)
- `prefers-reduced-motion` → tampilkan PNG statis, jangan init WebGL
