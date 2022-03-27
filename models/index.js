const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// User can have many Blogs
User.hasMany(Blog, {
    foreignKey: 'user_id'
});
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

// Blogs can have many Comments
Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);


module.exports = { User, Blog, Comment }