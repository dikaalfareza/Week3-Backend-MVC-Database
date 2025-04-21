const db = require("../connection/connection");

class ContactGroups {
  constructor(contactId, groupId, id = null) {
    this.id = id;
    this.contactId = contactId;
    this.groupId = groupId;
  }

  static create(contactId, groupId) {
    const newContactGroup = new ContactGroups(contactId, groupId);
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO ContactGroup (contactId, groupId) VALUES (?, ?)",
        [newContactGroup.contactId, newContactGroup.groupId],
        function (err) {
          if (err) return reject(err);
          newContactGroup.id = this.lastID;
          resolve(newContactGroup);
        }
      );
    });
  }

  static update(id, contactId, groupId) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE ContactGroup SET contactId = ?, groupId = ? WHERE id = ?",
        [contactId, groupId, id],
        function (err) {
          if (err) return reject(err);
          if (this.changes === 0) return reject(new Error(`id ${id} tidak ditemukan!`));
          resolve(new ContactGroups(contactId, groupId, id));
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM ContactGroup WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error(`id ${id} tidak ditemukan!`));
        resolve();
      });
    });
  }
}

module.exports = ContactGroups;
