const Groups = require("../models/groupsModel");
const View = require("../view/view");

class GroupsController {
  static async create(groupName) {
    try {
      await Groups.create(groupName);
      View.showSuccess(`Grup ${groupName} berhasil dibuat!`);
    } catch (error) {
      View.showError(`Gagal membuat grup: ${error.message}`);
    }
  }

  static async update(id, groupName) {
    try {
      await Groups.update(id, groupName);
      View.showSuccess(`Grup ${groupName} berhasil diupdate!`);
    } catch (error) {
      View.showError(`Gagal mengupdate grup: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await Groups.delete(id);
      View.showSuccess(`Grup dengan id ${id} berhasil dihapus!`);
    } catch (error) {
      View.showError(`Gagal menghapus grup: ${error.message}`);
    }
  }

  static async showGroups() {
    try {
      const groups = await Groups.showGroups();
      View.showTable(groups);
    } catch (error) {
      View.showError(`Gagal menampilkan grup: ${error.message}`);
    }
  }
}

module.exports = GroupsController;
