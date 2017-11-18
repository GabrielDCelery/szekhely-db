'use strict';

const _ = require('lodash');

function invoice(_sequelize, _modelName, _options) {
    return _sequelize.define(_modelName, {
        id: {
            type: _sequelize.Sequelize.UUID(),
            defaultValue: _sequelize.Sequelize.UUIDV4,
            primaryKey: true
        },
        number: {
            type: _sequelize.Sequelize.STRING(15)
        },
        amount: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        },
        billing_date: {
            type: _sequelize.Sequelize.DATE()
        },
        transfer_date: {
            type: _sequelize.Sequelize.DATE()
        },
        payment_method: {
            type: _sequelize.Sequelize.INTEGER.UNSIGNED
        },
        extra: {
            type: _sequelize.Sequelize.BLOB()
        }
    }, _.defaultsDeep({}, {}, _options));
}

module.exports = invoice;
