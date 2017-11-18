'use strict';

const _ = require('lodash');

function letterReceiver(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: _sequelize.Sequelize.STRING(64)
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = letterReceiver;
