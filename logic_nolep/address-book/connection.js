const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./address_book.db");

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON`);

  db.run(`CREATE TABLE IF NOT EXISTS Contact (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL ,
    phoneNumber TEXT NOT NULL UNIQUE,
    company TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY,
    groupName TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS ContactGroups (
    id INTEGER PRIMARY KEY,
    contactId INTEGER NOT NULL,
    groupId INTEGER NOT NULL,
    UNIQUE (contactId, groupId),
    FOREIGN KEY (contactId) REFERENCES Contact (id) ON DELETE CASCADE,
    FOREIGN KEY (groupId) REFERENCES Groups (id) ON DELETE CASCADE
    )`);
});

module.exports = db;
