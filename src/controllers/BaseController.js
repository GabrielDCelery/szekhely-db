'use strict';

class BaseController {
	constructor(_model) {
		this.model = _model;
	}

	addRecord(_values, _transaction) {
		const _options = {};

		if(_transaction) {
			_options._transaction = _transaction;
		}

		return this.model.create(_values, _options);
	}
}

module.exports = BaseController;