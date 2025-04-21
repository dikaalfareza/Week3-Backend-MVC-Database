const db = require("../connection/connection");

class Contact {
  constructor(name, phoneNumber, company, email, id = null) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.company = company;
    this.email = email;
  }

  static create(name, phoneNumber, company, email) {
    let newContact = new Contact(name, phoneNumber, company, email);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Contact (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`,
        [newContact.name, newContact.phoneNumber, newContact.company, newContact.email],
        function (err) {
          if (err) {
            reject(err);
          } else {
            newContact.id = this.lastID;
            resolve(newContact);
          }
        }
      );
    });
  }

  static update(id, name, phoneNumber, company, email) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?",
        [name, phoneNumber, company, email, id],
        function (err) {
          if (err) return reject(err);
          if (this.changes === 0) return reject(new Error(`Kontak dengan id ${id} tidak ditemukan!`));
          resolve(new Contact(name, phoneNumber, company, email, id));
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Contact WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error(`Kontak dengan id ${id} tidak ditemukan!`));
        resolve();
      });
    });
  }

  static getContacts() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT C.id AS contactId, C.name, C.phoneNumber, C.company, C.email, G.groupName
      FROM Contact C
      LEFT JOIN ContactGroup CG ON C.id = CG.contactId
      LEFT JOIN Groups G ON CG.groupId = G.id`;
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        if (rows.length <= 0) return reject(new Error("Kontak masih kosong."));
        resolve(rows);
      });
    });
  }
}

module.exports = Contact;
