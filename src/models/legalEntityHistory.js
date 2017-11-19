'use strict';

const _ = require('lodash');

function legalEntity(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        registerId: {
            type: _sequelize.Sequelize.STRING(20)
        },
        taxId: {
            type: _sequelize.Sequelize.STRING(20)
        },
        name: {
            type: _sequelize.Sequelize.STRING(64)
        },
        motherName: {
            type: _sequelize.Sequelize.STRING(64)
        },
        type: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        },
        effectiveFrom: {
            type: _sequelize.Sequelize.DATE()
        },
        effectiveTill: {
            type: _sequelize.Sequelize.DATE()
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = legalEntity;
