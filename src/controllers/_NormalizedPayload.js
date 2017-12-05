'use strict';

const _ = require('lodash');

class _NormalizedPayload {
    constructor() {
        this.normalizedPayload = {};
    }

    _appendINTEGER(_key, _value) {
        this.normalizedPayload[_key] = _.parseInt(_value);
    }

    _appendSTRING(_key, _value) {
        this.normalizedPayload[_key] = _.toString(_value);
    }

    _appendDATE(_key, _value) {
        let _date = null;

        try {
            _date = new Date(_value);
        } catch (_error) {
            _date = null;
        }

        this.normalizedPayload[_key] = _date;
    }

    append(_value, _key, _type) {
        if (_.isNil(_value)) {
            return;
        }

        return this[`_append${_type}`](_key, _value);
    }

    size() {
        return _.size(this.normalizedPayload);
    }

    get() {
        return _.cloneDeep(this.normalizedPayload);
    }
}

module.exports = _NormalizedPayload;
