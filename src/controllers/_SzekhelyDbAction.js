'use strict';

const _ = require('lodash');
const _NormalizedPayload = require('./_NormalizedPayload');
const LEGAL_ENTITY_LOOKUP = require('../lookups/legalEntityTypesToIntegers');

class DbAction {
    constructor(_controllers) {
        this.controllers = _controllers;
        this.records = {};
        this.formData = null;
        this.transaction = null;
    }

    _addAddress(_type) {
        const _normalizedPayload = new _NormalizedPayload();

        _normalizedPayload.append(this.formData[`${_type}Postcode`], 'postcode', 'INTEGER');
        _normalizedPayload.append(this.formData[`${_type}City`], 'city', 'STRING');
        _normalizedPayload.append(this.formData[`${_type}Address`], 'address', 'STRING');

        if (_normalizedPayload.size() === 0) {
            return Promise.resolve();
        }

        return this.controllers.address.findOrCreate(_normalizedPayload.get(),
                _normalizedPayload.get(), this.transaction)
            .then(_result => {
                this.records[`${_type}Address`] = _result[0];
            });
    }

    _setAddress(_type) {
        if (!this.records[`${_type}Address`]) {
            return Promise.resolve();
        }

        return this.records[_type].setAddress(this.records[`${_type}Address`], {
            transaction: this.transaction
        });
    }

    _addLegalEntity(_type) {
        const _normalizedPayload = new _NormalizedPayload();

        _normalizedPayload.append(LEGAL_ENTITY_LOOKUP[this.formData[`${_type}Type`]],
            'type', 'INTEGER');
        _normalizedPayload.append(this.formData[`${_type}Name`], 'name', 'STRING');
        _normalizedPayload.append(this.formData[`${_type}RegisterId`], 'registerId', 'STRING');
        _normalizedPayload.append(this.formData[`${_type}TaxId`], 'taxId', 'STRING');
        _normalizedPayload.append(this.formData[`${_type}MotherName`], 'motherName', 'STRING');

        if (_normalizedPayload.size() === 0) {
            return Promise.resolve();
        }

        return this.controllers[_type].findOrCreate(_normalizedPayload.get(),
                _normalizedPayload.get(), this.transaction)
            .then(_result => {
                this.records[_type] = _result[0];
            });
    }

    static _isPayloadValid(_payload) {
        let _bValid = false;

        _.forEach(_payload, _v => {
            if (!_.isNil(_v)) {
                _bValid = true;
            }
        });

        return _bValid;
    }
}

module.exports = DbAction;
