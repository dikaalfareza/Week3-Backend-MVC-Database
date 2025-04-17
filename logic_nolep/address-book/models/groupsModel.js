const db = require("../connection");

class Groups {
  constructor(groupName) {
    this.groupName = groupName;
  }

  static create(groupName) {
    const newGroup = new Groups(groupName);
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO Groups (groupName) VALUES (?)", [newGroup.groupName], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static update(id, groupName) {
    return new Promise((resolve, reject) => {
      db.run("UPDATE Groups SET groupName = ? WHERE id = ?", [groupName, id], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Groups WHERE id = ?", [id], (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static showGroups() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT G.id, G.groupName, C.name, C.phoneNumber, C.company, C.email
      FROM Groups G
      LEFT JOIN ContactGroups CG ON G.id = CG.groupId
      LEFT JOIN Contact C ON CG.contactId = C.id`;
      db.all(query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = Groups;
