'use strict';

const _ = require('lodash');

function phone(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        number: {
            type: _sequelize.Sequelize.STRING(20)
        },
        status: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = phone;
