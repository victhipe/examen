const {Schema, model} = require('mongoose');

const Users = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    adress: {type: String, required: true}
})
module.exports = model('Users', Users, 'users');