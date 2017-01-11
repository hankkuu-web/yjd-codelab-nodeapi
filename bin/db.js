const models = require('../app/models');

const sync = _=> models.sequelize.sync({force: true});

module.exports = {sync};
