CREATE TABLE karyawan (
  id_karyawan INTEGER PRIMARY KEY AUTOINCREMENT,
  nama  VARCHAR(100) NOT NULL,
  usia INT NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  gaji INT NOT NUll
);

CREATE TABLE absensi (
  id_absensi INTEGER PRIMARY KEY AUTOINCREMENT,
  id_karyawan INT NOT NULL,
  status VARCHAR(10) CHECK(status IN('hadir', 'izin', 'sakit', 'alpa')) NOT NULL,
  tanggal DATE NOT NULL,
  UNIQUE(id_karyawan, tanggal),
  FOREIGN KEY(id_karyawan) REFERENCES karyawan(id_karyawan)
);

CREATE TABLE proyek (
  id_proyek INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_proyek VARCHAR(100) NOT NULL,
  id_manager INT NOT NULL,
  biaya INT,
  keuntungan INT,
  status VARCHAR(15) CHECK(status IN('berjalan', 'selesai')) NOT NULL,
  FOREIGN KEY(id_manager) REFERENCES karyawan(id_karyawan)
);

CREATE TABLE tugas (
  id_tugas INTEGER PRIMARY KEY AUTOINCREMENT,
  id_karyawan INT NOT NULL,
  id_proyek INT NOT NULL,
  deskripsi TEXT NOT NULL,
  status VARCHAR(20) CHECK(status IN('belum', 'sedang dikerjakan', 'selesai')) NOT NULL,
  FOREIGN KEY(id_karyawan) REFERENCES karyawan(id_karyawan),
  FOREIGN KEY(id_proyek) REFERENCES proyek(id_proyek)
);

CREATE TABLE anggota_proyek (
  id_anggota INTEGER PRIMARY KEY AUTOINCREMENT,
  id_proyek INT NOT NULL,
  id_karyawan INT NOT NULL,
  FOREIGN KEY(id_proyek) REFERENCES proyek(id_proyek),
  FOREIGN KEY(id_karyawan) REFERENCES karyawan(id_karyawan)
);

CREATE TABLE pembayaran_karyawan (
  id_pembayaran INTEGER PRIMARY KEY AUTOINCREMENT,
  id_proyek INT NOT NULL,
  id_karyawan INT NOT NULL,
  jumlah_pembayaran INT NOT NULL,
  tanggal DATE NOT NULL,
  FOREIGN KEY(id_proyek) REFERENCES proyek(id_proyek),
  FOREIGN KEY(id_karyawan) REFERENCES karyawan(id_karyawan)
);


