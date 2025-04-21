const Group = require("../model/group");

class GroupController {
  static async getGroups(req, res) {
    try {
      const groups = await Group.getGroups();
      res.status(200).json({ message: "Berhasil menampilkan groups!", data: groups });
    } catch (error) {
      res.status(500).json({ message: "Gagal menampilkan group!", error: error.message });
    }
  }

  static async createGroups(req, res) {
    try {
      const { groupName } = req.body;
      const group = await Group.create(groupName);
      res.status(201).json({ message: "Group berhasil dibuat!", data: group });
    } catch (error) {
      res.status(500).json({ message: "Gagal membuat group!", error: error.message });
    }
  }

  static async updateGroups(req, res) {
    try {
      const { id } = req.params;
      const { groupName } = req.body;
      const group = await Group.update(id, groupName);
      res.status(200).json({ message: "Berhasil mengupdate group!", data: group });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      res.status(status).json({ message: "Gagal mengupdate group!", error: error.message });
    }
  }

  static async deleteGroups(req, res) {
    try {
      const { id } = req.params;
      await Group.delete(id);
      res.status(200).json({ message: `Group dengan id ${id} berhasil dihapus!` });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      res.status(status).json({ message: "Gagal menghapus group!", error: error.message });
    }
  }
}

module.exports = GroupController;
