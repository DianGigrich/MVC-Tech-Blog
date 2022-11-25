const { Post } = require('../models');

const posts = [
    {
        title: "Is this post great?",
        post: "Four Score and Seven years ago, our fathers brought forth on this continent a new nation conceived in liberty and dedicated to the proposition that all men are created equal.",
        UserId: 1,
    },
    {
        title: "I love tech blogs.",
        post: "This post will be even longer.  I made it so.  What do you think? Is it longer? It's the longest!!!",
        UserId: 1,
    },
    {
        title: "Third post title",
        post: "Third post and nothing to say. Ipsem lorem I presume.",
        UserId: 1,
    },
]

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;