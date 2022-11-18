const { Post } = require('../models');

const posts = [
    {
        name: "LionHeartLove",
        UserId: 1,
    },
    {
        name: "Jaws of The Lion",
        UserId: 2,
    },
    {
        name: "Matt is the best",
        UserId: 1,
    },
]

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;