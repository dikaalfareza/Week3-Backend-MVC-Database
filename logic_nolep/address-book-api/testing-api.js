const axios = require("axios");
const BASE_URL = "http://localhost:3000";

// data contacts
const contact1 = {
  name: "Andi Pratama",
  phoneNumber: "081234567890",
  company: "Tech Solutions",
  email: "andi@techsolutions.com",
};

const contact2 = {
  name: "Budi Santoso",
  phoneNumber: "089876543210",
  company: "Budi Corp",
  email: "budi@budicorp.com",
};

const contact3 = {
  name: "Citra Dewi",
  phoneNumber: "082112233445",
  company: "Creative Minds",
  email: "citra@creativeminds.com",
};

// data groups
const group1 = {
  groupName: "Teman Kerja",
};

const group2 = {
  groupName: "Keluarga",
};

const group3 = {
  groupName: "Teman SMA",
};

// data contactGroup
const contactGroup1 = {
  contactId: 1, // misal: Andi
  groupId: 2, // misal: Keluarga
};

const contactGroup2 = {
  contactId: 2, // Budi
  groupId: 1, // Teman Kerja
};

const contactGroup3 = {
  contactId: 3, // Citra
  groupId: 3, // Teman Kuliah
};

// TESTING API
async function createContact(contact) {
  try {
    const res = await axios.post(`${BASE_URL}/contact`, contact);
    console.log("Berhasil menambahkan kontak baru: ", res.data);
  } catch (error) {
    console.error("Gagal menambahkan kontak baru: ", error.response?.data || error.message);
  }
}

async function getContacts() {
  try {
    const res = await axios.get(`${BASE_URL}/contact`);
    console.log("Berhasil menampilkan data kontak: ", res.data);
  } catch (error) {
    console.error("Gagal menampilkan data kontak: ", error.response?.data || error.message);
  }
}

async function createGroup(group) {
  try {
    const res = await axios.post(`${BASE_URL}/groups`, group);
    console.log("Berhasil menambahkan group baru: ", res.data);
  } catch (error) {
    console.error("Gagal menambahkan group baru: ", error.response?.data || error.message);
  }
}

async function getGroups() {
  try {
    const res = await axios.get(`${BASE_URL}/groups`);
    console.log("Berhasil menampilkan data groups: ", res.data);
  } catch (error) {
    console.error("Gagal menampilkan data groups: ", error.response?.data || error.message);
  }
}

async function createContactGroup(contactGroup) {
  try {
    const res = await axios.post(`${BASE_URL}/contactGroup`, contactGroup);
    console.log("Berhasil menambahkan contact group baru: ", res.data);
  } catch (error) {
    console.error("Gagal menambahkan contact group baru: ", error.response?.data || error.message);
  }
}

// createContact(contact1);
// createContact(contact2);
// createContact(contact3);

// createGroup(group1);
// createGroup(group2);
// createGroup(group3);

// createContactGroup(contactGroup1);
// createContactGroup(contactGroup2);
// createContactGroup(contactGroup3);

getContacts();
getGroups();
