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
        return this.normalizedPayload;
    }
}

module.exports = _NormalizedPayload;
