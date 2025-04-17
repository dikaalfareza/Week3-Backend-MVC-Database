const db = require("../connection");

class Contact {
  constructor(name, phoneNumber, company, email) {
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
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
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
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Contact WHERE id = ?", [id], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static showContact() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT C.id AS contactId, C.name, C.phoneNumber, C.company, C.email, G.groupName
      FROM Contact C
      LEFT JOIN ContactGroups CG ON C.id = CG.contactId
      LEFT JOIN Groups G ON CG.groupId = G.id`;
      db.all(query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = Contact;
