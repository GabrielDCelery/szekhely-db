'use strict';

const LEGAL_ENTITY_LOOKUP = require('../lookups/legalEntityTypesToIntegers');

class AddNewContract {
    constructor(_controllers) {
        this.controllers = _controllers;
        this.records = {};
    }

    _addAddress(_type) {
        const _addressData = {
            postcode: this.formData[`${_type}Postcode`],
            city: this.formData[`${_type}City`],
            address: this.formData[`${_type}Address`]
        };

        return this.controllers.address.findOrCreate(_addressData, _addressData, this.transaction)
            .then(_result => {
                this.records[`${_type}Address`] = _result[0];
            });
    }

    _setAddress(_type) {
        return this.records[_type].setAddress(this.records[`${_type}Address`], {
            transaction: this.transaction
        });
    }

    _addLegalEntity(_type) {
        const _legalEntityData = {
            registerId: this.formData[`${_type}RegisterId`],
            taxId: this.formData[`${_type}TaxId`],
            name: this.formData[`${_type}Name`],
            motherName: this.formData[`${_type}MotherName`],
            type: LEGAL_ENTITY_LOOKUP[this.formData[`${_type}Type`]]
        };

        return this.controllers[_type].findOrCreate(_legalEntityData, _legalEntityData, this.transaction)
            .then(_result => {
                this.records[_type] = _result[0];
            });
    }

    process(_formData, _transaction) {
        this.formData = _formData;
        this.transaction = _transaction;

        return this._addAddress('customer')
            .then(() => {
                return this._addLegalEntity('customer');
            })
            .then(() => {
                return this._setAddress('customer');
            });
    }
}

module.exports = AddNewContract;
