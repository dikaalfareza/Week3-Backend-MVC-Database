const ContactGroups = require("../models/contactGroupsModel");
const View = require("../view/view");

class ContactGroupsController {
  static async create(contactId, groupId) {
    try {
      await ContactGroups.create(contactId, groupId);
      View.showSuccess(`Grup kontak berhasil ditambahkan!`);
    } catch (error) {
      View.showError(`Gagal menambahkan grup kontak: ${error.message}`);
    }
  }

  static async update(id, contactId, groupId) {
    try {
      await ContactGroups.update(id, contactId, groupId);
      View.showSuccess(`Grup kontak dengan id ${id} berhasil diupdate!`);
    } catch (error) {
      View.showError(`Gagal mengupdate grup kontak: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await ContactGroups.delete(id);
      View.showSuccess(`Grup kontak dengan id ${id} berhasil dihapus!`);
    } catch (error) {
      View.showError(`Gagal menghapus grup kontak: ${error.message}`);
    }
  }

  static async showContactGroups() {
    try {
      const contactGroups = await ContactGroups.showContactGroups();
      View.showTable(contactGroups);
    } catch (error) {
      View.showError(`Gagal menampilkan grup kontak: ${error.message}`);
    }
  }
}

module.exports = ContactGroupsController;
