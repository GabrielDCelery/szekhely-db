'use strict';

const _ = require('lodash');

function serviceProvider(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: _sequelize.Sequelize.STRING(64),
            unique: true
        },
        register_id: {
            type: _sequelize.Sequelize.STRING(20),
            unique: true
        },
        tax_id: {
            type: _sequelize.Sequelize.STRING(20),
            unique: true
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = serviceProvider;
