'use strict';

module.exports = {
	database: 'szekhely',
	username: 'sequelizeTestUser',
	password: 'password',
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
};