const Contact = require("../models/contactModel");
const View = require("../view/view");

class ContactController {
  static async create(name, phoneNumber, company, email) {
    try {
      await Contact.create(name, phoneNumber, company, email);
      View.showSuccess(`Kontak ${name} berhasil ditambahkan!`);
    } catch (error) {
      View.showError(`Gagal menambahkan kontak: ${error.message}`);
    }
  }

  static async update(id, name, phoneNumber, company, email) {
    try {
      await Contact.update(id, name, phoneNumber, company, email);
      View.showSuccess(`Kontak ${name} berhasil diupdate!`);
    } catch (error) {
      View.showError(`Gagal mengupdate kontak: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await Contact.delete(id);
      View.showSuccess(`Kontak dengan id ${id} berhasil dihapus!`);
    } catch (error) {
      View.showError(`Gagal menghapus kontak: ${error.message}`);
    }
  }

  static async showContact() {
    try {
      const contacts = await Contact.showContact();
      View.showTable(contacts);
    } catch (error) {
      View.showError(`Gagal menampilkan kontak: ${error.message}`);
    }
  }
}

module.exports = ContactController;
