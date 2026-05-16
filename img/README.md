# Folder Gambar (img)

Folder ini berisi semua gambar yang digunakan di website undangan.

## Daftar File Gambar:

### 1. `bride.jpg`
Foto pengantin perempuan. Format: Circular profile photo.
- Ukuran: 150x150px (akan di-crop circular)
- Format: JPG, PNG, atau SVG

### 2. `groom.jpg`
Foto pengantin laki-laki. Format: Circular profile photo.
- Ukuran: 150x150px (akan di-crop circular)
- Format: JPG, PNG, atau SVG

### 3. `gallery1.jpg` - `gallery4.jpg`
Gambar galeri untuk section galeri. Format: Square.
- Ukuran: Minimal 400x400px (responsive)
- Format: JPG, PNG, atau SVG
- Jumlah: 4 gambar (bisa ditambah dengan mengupdate HTML)

## Cara Mengganti Foto:

1. **Siapkan foto Anda** (format JPG, PNG, atau WebP)

2. **Untuk Foto Pengantin:**
   - Ganti file `bride.jpg` dan `groom.jpg`
   - Gunakan foto yang sudah di-crop circular atau square
   - Ukuran ideal: 400x400px atau lebih besar

3. **Untuk Galeri:**
   - Ganti file `gallery1.jpg` hingga `gallery4.jpg`
   - Bisa menambah lebih banyak dengan menambah elemen HTML
   - Ukuran ideal: 500x500px atau lebih besar

## Contoh Kode Menambah Galeri:

Buka `index.html` dan tambahkan di section gallery:

```html
<div class="gallery-item scroll-animate-scale">
    <img src="img/gallery5.jpg" alt="Galeri 5">
</div>
```

Kemudian upload file `gallery5.jpg` ke folder `img`.

## Tips Foto:

- **Pengantin**: Pilih foto close-up atau portrait
- **Galeri**: Gunakan foto moment spesial, engagement, atau venue
- **Ukuran**: Semakin besar semakin bagus (akan di-resize otomatis)
- **Format**: JPG recommended untuk ukuran file lebih kecil

## Icons yang Digunakan:

Website menggunakan Material Icons dari Google Fonts. Icon yang digunakan:
- `church` - Gereja/venue upacara
- `restaurant` - Resepsi makan
- `schedule` - Waktu
- `calendar_today` - Tanggal
- `location_on` - Lokasi
- `person` - Nama
- `email` - Email
- `phone` - Telepon
- `check_circle` - Konfirmasi
- `people` - Jumlah tamu
- `message` - Pesan
- `send` - Kirim
- `favorite` - Hati
