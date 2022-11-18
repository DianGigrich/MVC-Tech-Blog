const { Comment } = require('../models');

const comments = [
    {
        comment: "LionHeartLove",
        UserId: 1,
    },
    {
        comment: "Jaws of The Lion",
        UserId: 2,
    },
    {
        comment: "Matt is the best",
        UserId: 1,
    },
]

const seedComments = () => Comment.bulkCreate(comments);

module.exports = seedComments;