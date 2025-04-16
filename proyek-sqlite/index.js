const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database_karyawan.db");
const { promisify } = require("util");

const dbAll = promisify(db.all.bind(db));
const dbExec = promisify(db.exec.bind(db));
const dbRun = promisify(db.run.bind(db));

async function createTables() {
  try {
    await dbExec(`
      CREATE TABLE IF NOT EXISTS Karyawan (
        IDKaryawan INTEGER PRIMARY KEY,
        Nama TEXT NOT NULL,
        Usia INTEGER,
        Jabatan TEXT
      );
    `);

    await dbExec(`
      CREATE TABLE IF NOT EXISTS Proyek (
        IDProyek INTEGER PRIMARY KEY,
        NamaProyek TEXT NOT NULL,
        IDKaryawanPenanggung INTEGER,
        FOREIGN KEY (IDKaryawanPenanggung) REFERENCES Karyawan (IDKaryawan)
      );
    `);

    await dbExec(`
      CREATE TABLE IF NOT EXISTS Pekerjaan (
        IDPekerjaan INTEGER PRIMARY KEY,
        NamaPekerjaan TEXT NOT NULL,
        IDProyek INTEGER,
        IDKaryawan INTEGER,
        FOREIGN KEY (IDProyek) REFERENCES Proyek (IDProyek),
        FOREIGN KEY (IDKaryawan) REFERENCES Karyawan (IDKaryawan)
      );
    `);

    console.log("Tabel berhasil dibuat.");
  } catch (error) {
    console.error("Gagal membuat tabel:", error.message);
  }
}

// Panggil fungsi createTables untuk membuat tabel
// (async () => {
//   await createTables();
// })();

async function insertData() {
  try {
    await dbExec("BEGIN"); // Memulai transaksi

    await dbRun("INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)", ["John Doe", 30, "Manager"]);
    await dbRun("INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)", ["Jane Smith", 25, "Programmer"]);
    await dbRun("INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)", ["Bob Johnson", 35, "Sales"]);
    await dbRun("INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)", ["Alice Brown", 28, "Designer"]);

    await dbRun("INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)", ["Proyek A", 2]);
    await dbRun("INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)", ["Proyek B", 4]);
    await dbRun("INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)", ["Proyek C", 1]);

    await dbRun("INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)", ["Pekerjaan 1", 1, 2]);
    await dbRun("INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)", ["Pekerjaan 2", 1, 2]);
    await dbRun("INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)", ["Pekerjaan 3", 1, 4]);
    await dbRun("INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)", ["Pekerjaan 4", 2, 4]);
    await dbRun("INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)", ["Pekerjaan 5", 3, 1]);

    await dbExec("COMMIT"); // Menyelesaikan transaksi

    console.log("Data berhasil dimasukkan.");
  } catch (error) {
    await dbExec("ROLLBACK"); // Membatalkan transaksi jika terjadi kesalahan
    console.error("Gagal memasukkan data:", error.message);
  }
}

// Panggil fungsi insertData untuk menambahkan data ke tabel
// (async () => {
//   await insertData();
// })();

async function displayData() {
  try {
    const karyawanRows = await dbAll("SELECT * FROM Karyawan");
    console.log("Data Karyawan:");
    console.table(karyawanRows);

    const proyekRows = await dbAll("SELECT * FROM Proyek");
    console.log("Data Proyek:");
    console.table(proyekRows);

    const pekerjaanRows = await dbAll("SELECT * FROM Pekerjaan");
    console.log("Data Pekerjaan:");
    console.table(pekerjaanRows);
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
  }
}

// Panggil fungsi displayData untuk menampilkan data dari tabel
(async () => {
  await displayData();
})();
