'use strict';

const _ = require('lodash');

function postalAuthorization(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        number: {
            type: _sequelize.Sequelize.STRING(25)
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = postalAuthorization;
