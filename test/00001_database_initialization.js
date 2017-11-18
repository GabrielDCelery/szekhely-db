'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;
//const sinon = require('sinon');

const Database = require('../index').Database;

const dbConfig = {
    database: process.env.TEST_DB,
    username: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    host: process.env.TEST_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

describe('initDb', () => {
    it('initializes the database', () => {
        return expect(Database.initDb(dbConfig)).to.eventually.be.fulfilled;
    });
});

describe('resetDb', () => {
    it('resets the database', () => {
        return expect(Database.resetDb(true)).to.eventually.be.fulfilled;
    });
});
