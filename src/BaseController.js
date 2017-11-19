'use strict';

class BaseController {
    constructor(_model) {
        this.model = _model;
    }

    add(_values, _transaction) {
        const _options = {};

        if (_transaction) {
            _options.transaction = _transaction;
        }

        return this.model.create(_values, _options);
    }

    findOrCreate(_where, _defaults, _transaction) {
        const _options = {
            where: _where,
            defaults: _defaults
        };

        if (_transaction) {
            _options.transaction = _transaction;
        }

        return this.model.findOrCreate(_options);
    }
}

module.exports = BaseController;
