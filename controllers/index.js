const {loginUser, logoutUser, registerUser, resend, confirm} = require('./auth');
const {listContacts, getById, removeContact, addContact, updateContact, updateFavorite} = require('./contacts');

module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
    updateFavorite,
    resend, 
    confirm
}
