const { User } = require('../models');

const users = [
    {
        username: "Dian",
        password: "securePassword2",
    }
]

const seedUsers = () => User.bulkCreate(users, {individualHooks: true});

module.exports = seedUsers;