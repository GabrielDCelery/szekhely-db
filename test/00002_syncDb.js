'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;
const sinon = require('sinon');

const Database = require('../index').Database;

describe('syncDb', () => {
	it('syncs the database', () => {
		return expect(Database.syncDb(true)).to.eventually.be.fulfilled;
	});
});