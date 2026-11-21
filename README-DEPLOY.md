# HADID SAREKA — Portfolio Website

Website CV + portofolio statis. **Tanpa framework, tanpa build step, tanpa dependensi.**
Semua font & gambar di-host sendiri → bisa dibuka offline, cepat, dan gratis di GitHub Pages.

---

## Isi folder

```
portfolio-site/
├── index.html              ← halaman utama
├── css/style.css           ← seluruh gaya
├── js/main.js              ← interaksi (nav, reveal, counter, parallax 2.5D)
├── assets/
│   ├── character.png       ← karakter CGI (fallback)
│   ├── character.webp      ← karakter CGI (utama, 76 KB)
│   ├── favicon.svg
│   └── fonts/              ← Space Grotesk + Inter (self-hosted)
└── characters/             ← sumber: 3 variasi + cutout (tidak perlu di-upload)
```

**Yang perlu di-upload ke GitHub:** `index.html`, `css/`, `js/`, `assets/`

> Karakter utama adalah **gambar CGI premium** yang sudah dihapus background-nya. Efek **2.5D scroll tilt** dijalankan oleh `js/main.js`: rotateY −14°, rotateX 5°, translateZ −55px, scale 0.93, plus mouse parallax & breathing. Satu RAF loop, auto-pause saat hero tak terlihat. Pdf/WebP keduanya lokal — tanpa CDN.
>
> Eksperimen Three.js procedural sudah dibatalkan (hasilnya tetap stylized/chibi). Arsip ada di folder `characters/` dan `PANDUAN-LEVEL2-3D.md` kalau nanti kamu dapat file GLB.
**Tidak perlu:** `characters/`, `.venv/`

---

## Cara publish ke GitHub Pages (gratis)

### Opsi 1 — Repo baru (paling bersih, direkomendasikan)

1. Buka **https://github.com/new**
2. Repository name: `hadidsareka` (atau `portfolio`)
3. Public → **Create repository**
4. Di halaman repo kosong, klik **uploading an existing file**
5. Drag folder `index.html`, `css`, `js`, `assets` → **Commit changes**
6. Buka **Settings → Pages**
7. Source: **Deploy from a branch** → Branch: `main` → folder `/ (root)` → **Save**
8. Tunggu 1–2 menit → URL muncul:
   `https://<username>.github.io/hadidsareka/`

> Kalau nama repo = `<username>.github.io`, URL-nya jadi `https://<username>.github.io/` (tanpa subfolder).

### Opsi 2 — Pakai repo yang sudah ada

Upload file-file yang sama ke repo `prosora-blog`, lalu akses di
`https://prosorainc.github.io/prosora-blog/`.

> ⚠️ Repo itu punya file `CNAME` berisi `prosora.biz.id` yang DNS-nya masih mati.
> Selama `CNAME` ada, GitHub Pages akan redirect ke domain itu.
> **Hapus `CNAME`** dulu kalau mau pakai URL github.io.

---

## Cara ganti isi (edit sendiri)

Semua teks ada di `index.html`, mudah dicari:

| Mau ganti | Cari di index.html |
|---|---|
| Nama besar | `HADID` / `SAREKA` di `.hero__logo` |
| Profesi | `IT Consultant &amp; AI Engineer` |
| Email | `hadidsareka@gmail.com` (muncul 3×) |
| Link GitHub | `github.com/Prosorainc` |
| Proyek | blok `<article class="proj">` |
| Pengalaman | blok `<li class="tl">` |
| Angka statistik | atribut `data-count="6"` dst. |

**Ganti karakter:** timpa `assets/character.png` dan `assets/character.webp`
dengan gambar baru (PNG transparan, rasio potret). Ukuran ideal ±570×950 px.

**Ganti warna:** edit variabel di bagian `:root` pada `css/style.css`
(`--ink`, `--peach`, `--teal`, `--gold`).

---

## Fitur yang sudah ada

- Hero: tipografi raksasa + karakter 3D + kartu proyek glassmorphism
- Gradient midnight → peach, grain halus, glow teal & gold
- Navigasi fixed yang berubah saat scroll + menu mobile
- Animasi reveal saat scroll, counter angka
- **2.5D scroll tilt**: karakter miring + bergeser di kedalaman saat scroll (rotateY −14°, translateZ −55px, scale 0.93), plus mouse parallax & breathing. Satu RAF loop, auto-pause saat hero tak terlihat.
- Panduan upgrade ke 3D sungguhan (butuh GLB): `PANDUAN-LEVEL2-3D.md`
- Marquee keahlian berjalan
- Section: About, Services, Projects, Experience, Contact, Footer
- Responsive: desktop / tablet / HP
- Aksesibilitas: `prefers-reduced-motion`, focus ring, alt text, semantic HTML
- Font self-hosted (tidak ada request ke Google) → aman untuk jaringan kantor
- Total ukuran halaman ±200 KB

---

## Tes lokal

```bash
cd portfolio-site
python3 -m http.server 8899
# buka http://127.0.0.1:8899/
```

---

## Catatan

- Karakter dibuat dengan AI image generator dari deskripsi fitur wajah,
  lalu background-nya dihapus otomatis (rembg, model `u2net_human_seg`).
  Kemiripan ±70–80%, bukan hasil edit foto langsung.
- Kalau nanti mau kemiripan 100%, ganti `assets/character.*` dengan
  foto asli yang sudah dihapus background-nya.
