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

        _normalizedPayload.append(_.get(this.formData, [_type, 'postcode'], null), 'postcode', 'INTEGER');
        _normalizedPayload.append(_.get(this.formData, [_type, 'city'], null), 'city', 'STRING');
        _normalizedPayload.append(_.get(this.formData, [_type, 'address'], null), 'address', 'STRING');

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

        _normalizedPayload.append(LEGAL_ENTITY_LOOKUP[_.get(this.formData, [_type, 'type'], null)],
            'type', 'INTEGER');
        _normalizedPayload.append(_.get(this.formData, [_type, 'name'], null), 'name', 'STRING');
        _normalizedPayload.append(_.get(this.formData, [_type, 'registerId'], null), 'registerId', 'STRING');
        _normalizedPayload.append(_.get(this.formData, [_type, 'taxId'], null), 'taxId', 'STRING');
        _normalizedPayload.append(_.get(this.formData, [_type, 'motherName'], null), 'motherName', 'STRING');

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
