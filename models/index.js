const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

const getById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  // eslint-disable-next-line no-unneeded-ternary
  return result ? result : null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const indx = allContacts.findIndex(contact => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  const updateContacts = allContacts.filter((_, index) => index !== indx);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  return allContacts[indx];
}

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(), 
    name: name, 
    email: email, 
    phone: phone
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if(contactIndex !== -1){
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
    
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
