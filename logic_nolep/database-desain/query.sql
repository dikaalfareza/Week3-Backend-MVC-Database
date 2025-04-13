-- Absensi Karyawan
SELECT a.tanggal, k.nama, a.status 
FROM absensi a JOIN karyawan k
ON a.id_karyawan = k.id_karyawan;

-- list tugas setiap karyawan
SELECT k.nama, p.nama_proyek, t.deskripsi tugas, t.status
FROM tugas t 
JOIN karyawan k ON t.id_karyawan = k.id_karyawan
JOIN proyek p ON p.id_proyek = t.id_proyek
ORDER BY k.nama, p.nama_proyek;

-- manajemen project pada manager
SELECT k.nama manager, p.nama_proyek, p.biaya, p.keuntungan, p.status
FROM proyek p JOIN karyawan k 
ON p.id_manager = k.id_karyawan;

-- list orang2 yang mengikuti sebuah project yang dia kerjakan
SELECT p.nama_proyek, k.nama
FROM anggota_proyek a 
JOIN proyek p ON p.id_proyek = a.id_proyek
JOIN karyawan k ON k.id_karyawan = a.id_karyawan
ORDER BY p.nama_proyek, k.nama;

-- menghitung pengeluaran project untuk membayar karyawan (hanya manajer)
SELECT p.nama_proyek, SUM(pk.jumlah_pembayaran) total_pengeluaran_manager
FROM pembayaran_karyawan pk
JOIN proyek p ON p.id_proyek = pk.id_proyek
JOIN karyawan k ON k.id_karyawan = pk.id_karyawan
WHERE k.jabatan = 'Manager'
GROUP BY p.nama_proyek;

-- menghitung keuntungan dari hasil menyelesaikan project (hanya manajer)
SELECT p.nama_proyek, k.nama manager, p.keuntungan 
FROM proyek p
JOIN karyawan k ON k.id_karyawan = p.id_manager
WHERE status = 'selesai';