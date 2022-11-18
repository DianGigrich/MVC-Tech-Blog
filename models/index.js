const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post)
Comment.hasMany(User)
Post.hasMany(Comment)



module.exports = { User, Post, Comment };
