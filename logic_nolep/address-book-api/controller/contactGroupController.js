const ContactGroup = require("../model/contactGroup");

class ContactGroupController {
  static async createContactGroup(req, res) {
    try {
      const { contactId, groupId } = req.body;
      const newContactGroup = await ContactGroup.create(contactId, groupId);
      res.status(200).json({ message: "Contact group berhasil ditambahkan!", data: newContactGroup });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan contact group!", error: error.message });
    }
  }

  static async updateContactGroup(req, res) {
    try {
      const { id } = req.params;
      const { contactId, groupId } = req.body;
      const uptContactGroup = await ContactGroup.update(id, contactId, groupId);
      res.status(200).json({ message: "Berhasil mengupdate contact group!", data: uptContactGroup });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      res.status(status).json({ message: "Gagal mengupdate contact group!", error: error.message });
    }
  }

  static async deleteContactGroup(req, res) {
    try {
      const { id } = req.params;
      await ContactGroup.delete(id);
      res.status(200).json({ message: `ContactGroup dengan id ${id} berhasil dihapus!` });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      res.status(status).json({ message: "Gagal menghapus contact group!", error: error.message });
    }
  }
}

module.exports = ContactGroupController;
