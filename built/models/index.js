const User = require('./User');
const Memory = require('./Memory');

Memory.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Memory
};