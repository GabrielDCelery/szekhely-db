'use strict';

const _ = require('lodash');
const Bluebird = require('bluebird');
const _NormalizedPayload = require('./_NormalizedPayload');
const LEGAL_ENTITY_LOOKUP = require('../lookups/legalEntityTypesToIntegers');

class DbAction {
    constructor(_controllers) {
        this.controllers = _controllers;
        this.records = {};
        this.formData = null;
        this.transaction = null;
    }

    _addContract() {
        const _normalizedPayload = new _NormalizedPayload();

        _normalizedPayload.append(_.get(this.formData, ['contract', 'startingDate'], null), 'startingDate', 'DATE');
        _normalizedPayload.append(_.get(this.formData, ['contract', 'endingDate'], null), 'endingDate', 'DATE');
        _normalizedPayload.append(_.get(this.formData, ['contract', 'services'], null), 'services', 'INTEGER');

        if (_normalizedPayload.size() === 0) {
            return Promise.resolve();
        }

        return this.controllers.contract.add(_normalizedPayload.get(), this.transaction)
            .then(_result => {
                _.set(this.records, ['contract'], _result);
            });
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
                _.set(this.records, [_type, 'address'], _result[0]);
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
                _.set(this.records, [_type, 'legalEntity'], _result[0]);
            });
    }

    _addPhones() {
        const _phones = _.get(this.formData, ['contract', 'phones'], []);
        const _phoneRecords = [];

        return Bluebird.mapSeries(_phones, _phone => {
                const _normalizedPayload = new _NormalizedPayload();

                _normalizedPayload.append(_.get(_phone, ['country']), 'country', 'STRING');
                _normalizedPayload.append(_.get(_phone, ['provider']), 'provider', 'STRING');
                _normalizedPayload.append(_.get(_phone, ['number']), 'number', 'STRING');

                const _where = _normalizedPayload.get();
                const _defaults = _.merge(_normalizedPayload.get(), {
                    active: true
                });

                return this.controllers.phone.findOrCreate(_where, _defaults, this.transaction)
                    .then(_result => {
                        _phoneRecords.push(_result[0]);
                    });
            })
            .then(() => {
                _.set(this.records, ['phones'], _phoneRecords);
            });
    }

    _setAddress(_type) {
        const _recordLegalEntity = _.get(this.records, [_type, 'legalEntity'], null);
        const _recordAddress = _.get(this.records, [_type, 'address'], null);

        if (!_recordLegalEntity || !_recordAddress) {
            return Promise.resolve();
        }

        return _recordLegalEntity.setAddress(_recordAddress, {
            transaction: this.transaction
        });
    }

    _setPhones() {
        const _recordContract = _.get(this.records, ['contract'], null);
        const _recordPhones = _.get(this.records, ['phones'], null);

        if (!_recordContract || !_recordPhones) {
            return Promise.resolve();
        }

        return _recordContract.setPhones(_recordPhones, {
            transaction: this.transaction
        });
    }
}

module.exports = DbAction;
