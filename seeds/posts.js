const { Post } = require('../models');

const posts = [
    {
        title: "Is this post great?",
        post: "Here is a great post. The greatest post.",
        UserId: 1,
    },
    {
        title: "I love tech blogs.",
        post: "Here we go here we go here we go!",
        UserId: 1,
    },
    {
        title: "Third post title",
        post: "If I had more to say, I'd write it here.",
        UserId: 1,
    },
]

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;