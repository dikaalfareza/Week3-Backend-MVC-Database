const db = require("../connection");

class ContactGroups {
  constructor(contactId, groupId) {
    this.contactId = contactId;
    this.groupId = groupId;
  }

  static create(contactId, groupId) {
    const newContactGroup = new ContactGroups(contactId, groupId);
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO ContactGroups (contactId, groupId) VALUES (?, ?)",
        [newContactGroup.contactId, newContactGroup.groupId],
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  static update(id, contactId, groupId) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE ContactGroups SET contactId = ?, groupId = ? WHERE id = ?", [contactId, groupId, id], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM ContactGroups WHERE id = ?", [id], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static showContactGroups() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ContactGroups`;
      db.all(query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = ContactGroups;
