const db = require("../connection/connection");

class Groups {
  constructor(groupName, id = null) {
    this.id = id;
    this.groupName = groupName;
  }

  static create(groupName) {
    const newGroup = new Groups(groupName);
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO Groups (groupName) VALUES (?)", [newGroup.groupName], function (err) {
        if (err) return reject(err);
        newGroup.id = this.lastID;
        resolve(newGroup);
      });
    });
  }

  static update(id, groupName) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE Groups SET groupName = ? WHERE id = ?", [groupName, id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error(`Group dengan id ${id} tidak ditemukan!`));
        resolve(new Groups(groupName, id));
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Groups WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error(`Group dengan id ${id} tidak ditemukan!`));
        resolve();
      });
    });
  }

  static getGroups() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT G.id, G.groupName, C.name, C.phoneNumber, C.company, C.email
      FROM Groups G
      LEFT JOIN ContactGroup CG ON G.id = CG.groupId
      LEFT JOIN Contact C ON CG.contactId = C.id`;
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        if (rows.length <= 0) return reject(new Error("Belum ada group yang dibuat!"));
        resolve(rows);
      });
    });
  }
}

module.exports = Groups;
