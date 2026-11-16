# My Ojol Finance (`my-ojol-finance`)

Aplikasi web pencatatan keuangan harian **Mobile-First** untuk pengemudi ojek online (Gojek, Grab, Maxim), dibangun menggunakan **Next.js 14 (App Router)**, **Tailwind CSS**, **Prisma ORM (Vercel Postgres)**, dan **NextAuth.js (Credentials Provider)**.

## Fitur Utama

1. **Autentikasi & Proteksi Penuh (`/login` & `middleware.ts`)**
   - Login & Registrasi menggunakan Username dan Password (di-hash dengan `bcryptjs`).
   - Seluruh halaman aplikasi (`/`, `/add`, `/bills`) dikunci menggunakan Next.js Middleware dan hanya dapat diakses setelah pengguna login.
2. **Dashboard Keuangan (`/`)**
   - Kalkulasi otomatis 3 Kartu Ringkasan: **Pendapatan Kotor (Gross)**, **Pengeluaran Operasional (Ops)**, dan **Keuntungan Bersih (Take-Home Pay)**.
   - Filter rentang waktu: **Harian**, **Mingguan**, dan **Bulanan**.
   - Grafik batang ganda (Bar Chart) untuk memantau tren pemasukan vs pengeluaran.
3. **Form Input Cepat (`/add`)**
   - Sistem **Tab Toggle** (Pendapatan vs Pengeluaran).
   - **Quick Increment Chips** (`+10rb`, `+20rb`, `+50rb`, `+100rb`) yang langsung menjumlahkan nominal saat ditekan.
   - Tombol **Tap-to-Select** kategori:
     - *Pendapatan*: `Gojek`, `Grab`, `Maxim`, `Tip`
     - *Pengeluaran*: `Bensin`, `Makan`, `Parkir`, `Pulsa`
   - Tombol **SIMPAN** berukuran penuh di bagian bawah layar yang terhubung langsung ke Server Action.
4. **Modul Pengingat Utang & Tagihan (`/bills`)**
   - Fitur **CRUD Lengkap** (Tambah cicilan, Edit nama/nominal cicilan, Hapus cicilan permanen).
   - Tombol Aksi **"Bayar Sekarang"** yang dijalankan dalam satu transaksi database atomik (`prisma.$transaction`):
     - Mengubah status `isPaid` menjadi `true`.
     - Otomatis membuat record baru di tabel `Transaction` bertipe `EXPENSE` dengan kategori `"Cicilan/Utang"` sebesar nominal tagihan tersebut sehingga keuntungan bersih di Dashboard langsung terpotong.
5. **Navigasi Mobile (`BottomNav.tsx`)**
   - Navigasi bawah layar yang selalu mudah dijangkau ibu jari untuk berpindah antara `/`, `/add`, dan `/bills`.

## Cara Menjalankan di Lokal / Vercel

1. Salin file `.env.example` menjadi `.env` dan isi `POSTGRES_PRISMA_URL` serta `NEXTAUTH_SECRET`:
   ```bash
   cp .env.example .env
   ```
2. Instal dependensi dan sinkronisasikan skema Prisma ke Vercel Postgres:
   ```bash
   npm install
   npx prisma db push
   npm run db:seed
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
