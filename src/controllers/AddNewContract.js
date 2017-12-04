'use strict';

const Bluebird = require('bluebird');
const _SzekhelyDbAction = require('./_SzekhelyDbAction');

class AddNewContract extends _SzekhelyDbAction {
    process(_formData, _transaction) {
        this.formData = _formData;
        this.transaction = _transaction;

        return Bluebird.mapSeries(['customer', 'customerSigner', 'holder',
            'recipient', 'serviceProvider', 'serviceProviderSigner'
        ], _type => {
            return this._addAddress(_type)
                .then(() => {
                    return this._addLegalEntity(_type);
                })
                .then(() => {
                    return this._setAddress(_type);
                });
        });
    }
}

module.exports = AddNewContract;
