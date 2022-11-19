const { Comment } = require('../models');

const comments = [
    {
        comment: "This was terrible post.",
        PostId: 1,
        UserId: 1,
    },
    {
        comment: "I think so too!",
        PostId: 2,
        UserId: 1,
    },
    {
        comment: "This is a comment",
        PostId: 3,
        UserId: 1,
    },
]

const seedComments = () => Comment.bulkCreate(comments);

module.exports = seedComments;