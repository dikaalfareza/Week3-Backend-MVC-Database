const ContactController = require("./controllers/contactController");
const GroupsController = require("./controllers/groupsController");
const ContactGroupsController = require("./controllers/contactGroupsController");
const chalk = require("chalk");

const query = process.argv[2];
const table = process.argv[3];

switch (query) {
  case "create":
    if (table.toLowerCase() === "contact") {
      const [name, phoneNumber, company, email] = process.argv.slice(4);
      ContactController.create(name, phoneNumber, company, email);
    } else if (table.toLowerCase() === "groups") {
      const [groupName] = process.argv.slice(4);
      GroupsController.create(groupName);
    } else if (table.toLowerCase() === "contactgroups") {
      const [contactId, groupId] = process.argv.slice(4);
      ContactGroupsController.create(contactId, groupId);
    } else {
      console.log(chalk.red(`${table} tidak ditemukan di database.`));
    }
    break;
  case "update":
    if (table.toLowerCase() === "contact") {
      const [id, name, phoneNumber, company, email] = process.argv.slice(4);
      ContactController.update(id, name, phoneNumber, company, email);
    } else if (table.toLowerCase() === "groups") {
      const [id, groupName] = process.argv.slice(4);
      GroupsController.update(id, groupName);
    } else if (table.toLowerCase() === "contactgroups") {
      const [id, contactId, groupId] = process.argv.slice(4);
      ContactGroupsController.update(id, contactId, groupId);
    } else {
      console.log(chalk.red(`${table} tidak ditemukan di database.`));
    }
    break;
  case "delete":
    if (table.toLowerCase() === "contact") {
      const [id] = process.argv.slice(4);
      ContactController.delete(id);
    } else if (table.toLowerCase() === "groups") {
      const [id] = process.argv.slice(4);
      GroupsController.delete(id);
    } else if (table.toLowerCase() === "contactgroups") {
      const [id] = process.argv.slice(4);
      ContactGroupsController.delete(id);
    } else {
      console.log(chalk.red(`${table} tidak ditemukan di database.`));
    }
    break;
  case "showContact":
    ContactController.showContact();
    break;
  case "showGroups":
    GroupsController.showGroups();
    break;
  case "showContactGroups":
    ContactGroupsController.showContactGroups();
    break;
  case "help":
    console.log(
      chalk.yellow(`
====================
ADDRESS BOOK COMMAND
====================

> node main.js create Contact <name> <phoneNumber> <company> <email> 
> node main.js update Contact <id> <name> <phoneNumber> <company> <email> 
> node main.js delete Contact <id> 
> node main.js showContact 
> node main.js create Groups <groupName> 
> node main.js update Groups <id> <groupName> 
> node main.js delete Groups <id> 
> node main.js showGroups 
> node main.js create ContactGroups <contactId> <groupId> 
> node main.js update ContactGroups <id> <contactId> <groupId> 
> node main.js delete ContactGroups <id>
> node main.js showContactGroups 
> node main.js help 
`)
    );
    break;
  default:
    console.log(chalk.red(`query tidak dikenali, untuk info lengkap gunakan "node main.js help".`));
}
