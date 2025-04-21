const Contact = require("../model/contact");

class ContactController {
  static async createContact(req, res) {
    try {
      const { name, phoneNumber, company, email } = req.body;
      const contact = await Contact.create(name, phoneNumber, company, email);
      return res.status(201).json({ message: `Kontak ${name} berhasil ditambahkan!`, data: contact });
    } catch (error) {
      return res.status(500).json({ message: "Gagal menambahkan kontak!", error: error.message });
    }
  }

  static async updateContact(req, res) {
    try {
      const { id } = req.params;
      const { name, phoneNumber, company, email } = req.body;
      const contact = await Contact.update(id, name, phoneNumber, company, email);
      return res.status(200).json({ message: `Kontak ${name} berhasil diupdate!`, data: contact });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      return res.status(status).json({ message: "Gagal mengupdate kontak!", error: error.message });
    }
  }

  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      await Contact.delete(id);
      return res.status(200).json({ message: `Kontak dengan id ${id} berhasil dihapus!` });
    } catch (error) {
      const status = error.message.includes("tidak ditemukan!") ? 404 : 500;
      return res.status(status).json({ message: "Gagal menghapus kontak!", error: error.message });
    }
  }

  static async getContacts(req, res) {
    try {
      const contacts = await Contact.getContacts();
      res.status(200).json({ message: "Berhasil menampilkan kontak!", data: contacts });
    } catch (error) {
      res.status(500).json({ message: "Gagal menampilkan kontak!", error: error.message });
    }
  }
}

module.exports = ContactController;
