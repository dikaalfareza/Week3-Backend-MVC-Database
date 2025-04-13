INSERT INTO karyawan (nama, usia, jabatan, gaji) VALUES
('Rezky Evan Saputra', 20, 'Analyst', 8000000),
('Dika Alfa Reza', 23, 'Programmer', 10000000),
('Azzukhruf Fauzan', 22, 'Manager', 15000000),
('Nala Sandi Ramadhan', 23, 'Manager', 15000000),
('Farel Rizki Pratama', 24, 'Sales', 7500000),
('Mohamad Reyhan', 20, 'Designer', 7000000);

INSERT INTO absensi (id_karyawan, status, tanggal) VALUES
(1, 'hadir', '2025-04-10'),
(2, 'hadir', '2025-04-10'),
(3, 'izin', '2025-04-10'),
(4, 'hadir', '2025-04-10'),
(5, 'sakit', '2025-04-10'),
(6, 'hadir', '2025-04-10'),
(1, 'hadir', '2025-04-11'),
(2, 'hadir', '2025-04-11'),
(3, 'hadir', '2025-04-11'),
(4, 'hadir', '2025-04-11'),
(5, 'hadir', '2025-04-11'),
(6, 'alpa', '2025-04-11');

INSERT INTO proyek (nama_proyek, id_manager, biaya, keuntungan, status) VALUES
('Sistem Inventori Aplikasi', 3, 30000000, 15000000, 'berjalan'),
('Redesign Website E-Commerce', 4, 25000000, 12000000, 'selesai');

INSERT INTO tugas (id_karyawan, id_proyek, deskripsi, status) VALUES
(1, 1, 'Analisis kebutuhan sistem', 'selesai'),
(2, 1, 'Membangun backend aplikasi', 'sedang dikerjakan'),
(3, 1, 'Mengawasi keseluruhan project', 'sedang dikerjakan'),
(4, 2, 'Koordinasi tim desain dan developer', 'selesai'),
(5, 2, 'Testing promosi dan produk baru', 'selesai'),
(6, 2, 'Desain ulang tampilan halaman utama', 'selesai');

INSERT INTO anggota_proyek (id_proyek, id_karyawan) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6);

INSERT INTO pembayaran_karyawan (id_proyek, id_karyawan, jumlah_pembayaran, tanggal) VALUES
(1, 1, 7000000, '2025-04-12'),
(1, 2, 9000000, '2025-04-12'),
(1, 3, 10000000, '2025-04-12'),
(2, 4, 11000000, '2025-04-05'),
(2, 5, 6000000, '2025-04-05'),
(2, 6, 6500000, '2025-04-05');

