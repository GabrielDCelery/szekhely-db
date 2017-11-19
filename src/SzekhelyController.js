'use strict';

const Bluebird = require('bluebird');
const SzekhelyDatabase = require('./SzekhelyDatabase');

const DB_ACTION_CLASSES = {
    AddNewContract: require('./controllers/AddNewContract')
};

class SzekhelyController {
    static _instantiateDbActionClass(_type) {
        const _controllers = {
            customer: SzekhelyDatabase.getController('customer'),
            customerHistory: SzekhelyDatabase.getController('customerHistory'),
            contract: SzekhelyDatabase.getController('contract'),
            documentHolder: SzekhelyDatabase.getController('documentHolder'),
            address: SzekhelyDatabase.getController('address')
        };

        return new DB_ACTION_CLASSES[_type](_controllers);
    }

    static process(_DbActionClassName, _formData, _transaction) {
        if (!_transaction) {
            return SzekhelyDatabase.getSequelize().transaction(_t => {
                return SzekhelyController.process(_DbActionClassName, _formData, _t);
            });
        }

        return SzekhelyController._instantiateDbActionClass(_DbActionClassName).process(_formData, _transaction);
    }

    static processArray(_DbActionClassName, _arrFormData, _transaction) {
        if (!_transaction) {
            return SzekhelyDatabase.getSequelize().transaction(_t => {
                return SzekhelyController.processArray(_DbActionClassName, _arrFormData, _t);
            });
        }

        return Bluebird.mapSeries(_arrFormData, _formData => {
            return SzekhelyController.process(_DbActionClassName, _formData, _transaction);
        });
    }
}

module.exports = SzekhelyController;
