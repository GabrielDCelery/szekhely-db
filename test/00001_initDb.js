'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;
const sinon = require('sinon');

const Database = require('../index').Database;
const dbConnectionConfig = require('./data/dbConnectionConfig');

describe('initDb', () => {
	it('initializes the database', () => {
		return expect(Database.initDb(dbConnectionConfig)).to.eventually.be.fulfilled;
	});
});