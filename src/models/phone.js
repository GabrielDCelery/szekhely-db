'use strict';

const _ = require('lodash');

function phone(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        country: {
            type: _sequelize.Sequelize.STRING(4)
        },
        provider: {
            type: _sequelize.Sequelize.STRING(4)
        },
        number: {
            type: _sequelize.Sequelize.STRING(20)
        },
        active: {
            type: _sequelize.Sequelize.BOOLEAN()
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = phone;
