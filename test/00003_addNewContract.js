'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;
const sinon = require('sinon');

const Database = require('../index').Database;
const Controller = require('../index').Controller;

describe('addNewContract', () => {
	let controller = null;

	beforeEach(() => {
		return Database.syncDb(true)
			.then(() => {
				controller = new Controller();
			});
	});

	it('adds new contracts', () => {
		return controller.addNewContract({
			customer_name: 'Test Kft.'
		});
	});
});