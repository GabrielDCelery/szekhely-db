'use strict';

const DatabaseCore = require('./DatabaseCore');

const MODELS = {
	customer: {
		name: 'customer',
		definition: require('./models/_customer')
	},
	contract: {
		name: 'contract',
		definition: require('./models/_contract')
	},
	email: {
		name: 'email',
		definition: require('./models/_email')
	}
};

const ASSOCIATIONS = [
	['customer', 'oneToMany', 'contract'],
	['contract', 'manyToMany', 'email']
];

class SzekhelyDatabase extends DatabaseCore {
	static initDb(_dbConfig) {
		return SzekhelyDatabase._initDb(_dbConfig, {
			models: MODELS,
			associations: ASSOCIATIONS
		});
	}
}

module.exports = SzekhelyDatabase;