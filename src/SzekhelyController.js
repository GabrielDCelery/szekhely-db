'use strict';

const SzekhelyDatabase = require('./SzekhelyDatabase');

class SzekhelyController {
	constructor() {
		this.database = SzekhelyDatabase;
		this.controllers = {
			customer: this.database.getController('customer')
		};
	}

	addNewContract(_values) {
		return this.controllers.customer.addRecord(_values);
	}


}

module.exports = SzekhelyController;

