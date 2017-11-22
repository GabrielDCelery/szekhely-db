'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;
const sinon = require('sinon');
const sequelizeFixtures = require('sequelize-fixtures');

const Database = require('../index').Database;
const SzekhelyController = require('../index').Controller;

const addNewCustomersData = require('./data/01_addNewCustomers.json');

let sandbox = null;
let clock = null;

describe('addNewCustomer', () => {
    /*
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        clock = sinon.useFakeTimers(new Date('2017-11-19'));

        return Database.resetDb(true)
            .then(() => {
                return sequelizeFixtures.loadFile('test/fixtures/*.json', Database.getSequelize().models);
            });
    });

    afterEach(() => {
        sandbox.restore();
        clock.restore();
    });
    */

    it('adds a new contract', () => {
        return SzekhelyController.processArray('AddNewContract', addNewCustomersData);
    });
});
