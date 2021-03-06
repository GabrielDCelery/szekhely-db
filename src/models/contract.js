'use strict';

const _ = require('lodash');

function contract(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        startingDate: {
            type: _sequelize.Sequelize.DATE()
        },
        endingDate: {
            type: _sequelize.Sequelize.DATE()
        },
        services: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = contract;
