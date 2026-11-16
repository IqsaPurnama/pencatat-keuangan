// File: prisma/seed.ts
// Tujuan: Script seeder untuk membuat akun pengguna (driver ojol) awal beserta contoh transaksi dan tagihan
// ke dalam database PostgreSQL (Vercel Postgres) menggunakan Prisma Client.

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding database my-ojol-finance...");

  // 1. Enkripsi password default ("ojol123") menggunakan bcrypt
  const hashedPassword = await bcrypt.hash("ojol123", 10);

  // 2. Buat atau perbarui akun pengguna default dengan username: "driver_ojol"
  const user = await prisma.user.upsert({
    where: { username: "driver_ojol" },
    update: {},
    create: {
      username: "driver_ojol",
      password: hashedPassword,
    },
  });

  console.log(`Akun pengguna siap: username="${user.username}" (password: "ojol123")`);

  // 3. Tambahkan beberapa transaksi awal (Pendapatan & Pengeluaran) jika user belum memiliki transaksi
  const existingTxCount = await prisma.transaction.count({
    where: { userId: user.id },
  });

  if (existingTxCount === 0) {
    await prisma.transaction.createMany({
      data: [
        {
          userId: user.id,
          type: "INCOME",
          amount: 180000,
          category: "Gojek",
          date: new Date(),
        },
        {
          userId: user.id,
          type: "INCOME",
          amount: 70000,
          category: "Grab",
          date: new Date(),
        },
        {
          userId: user.id,
          type: "INCOME",
          amount: 20000,
          category: "Tip",
          date: new Date(),
        },
        {
          userId: user.id,
          type: "EXPENSE",
          amount: 35000,
          category: "Bensin",
          date: new Date(),
        },
        {
          userId: user.id,
          type: "EXPENSE",
          amount: 25000,
          category: "Makan",
          date: new Date(),
        },
      ],
    });
    console.log("Berhasil menambahkan contoh data transaksi harian.");
  }

  // 4. Tambahkan contoh pengingat cicilan di tabel Bill jika belum ada
  const existingBillCount = await prisma.bill.count({
    where: { userId: user.id },
  });

  if (existingBillCount === 0) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    await prisma.bill.createMany({
      data: [
        {
          userId: user.id,
          title: "Cicilan Motor Beat",
          amount: 650000,
          dueDate: nextWeek,
          isPaid: false,
        },
        {
          userId: user.id,
          title: "Paket Data & Pulsa Bulanan",
          amount: 100000,
          dueDate: nextWeek,
          isPaid: false,
        },
      ],
    });
    console.log("Berhasil menambahkan contoh daftar cicilan/tagihan.");
  }

  console.log("Proses seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
