'use strict';

const Bluebird = require('bluebird');
const _SzekhelyDbAction = require('./_SzekhelyDbAction');

class AddNewContract extends _SzekhelyDbAction {
    process(_formData, _transaction) {
        this.formData = _formData;
        this.transaction = _transaction;

        return Bluebird.mapSeries(['customer', 'contractSignesr'], _type => {
                return this._addAddress(_type);
            })
            .then(() => {
                return this._addLegalEntity('customer');
            })
            .then(() => {
                return this._setAddress('customer');
            });
    }
}

module.exports = AddNewContract;
