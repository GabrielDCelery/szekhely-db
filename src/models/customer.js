'use strict';

const _ = require('lodash');

function customer(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        version: {
            type: _sequelize.Sequelize.INTEGER().UNSIGNED,
            defaultValue: 0,
            primaryKey: true
        },
        tax_id: {
            type: _sequelize.Sequelize.STRING(20),
            defaultValue: 'new',
            primaryKey: true
        },
        register_id: {
            type: _sequelize.Sequelize.STRING(20)
        },
        name: {
            type: _sequelize.Sequelize.STRING(64)
        },
        type: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        },
        active: {
            type: _sequelize.Sequelize.BOOLEAN()
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = customer;
