'use strict';

const _ = require('lodash');

function email(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        address: {
            type: _sequelize.Sequelize.STRING(255)
        },
        active: {
            type: _sequelize.Sequelize.BOOLEAN()
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = email;
