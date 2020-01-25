var User = require('./user');
var Post = require('./Post');
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
module.exports = {
    User: User,
    Post: Post
};
