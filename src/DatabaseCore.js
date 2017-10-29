'use strict';

const _ = require('lodash');
const pluralize = require('pluralize');
const Sequelize = require('sequelize');
const BaseController = require('./controllers/BaseController');

const DEFAULT_DB_CONFIG = {
	database: 'szekhely',
	username: 'root',
	password: null,
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
};

const DB = {
	controllers: {},
	models: {},
	sequelize: null,
	initialized: false
};

class DbWrapper {
	static _registerModel(_modelName, _modelDefinition) {
		if(_.has(DB.models, _modelName)) {
			throw new Error(`Model ${_modelName} already registered!`);
		}

		_.set(DB.models, _modelName, _modelDefinition(DB.sequelize, _modelName));
	}

	static _registerModels(_models) {
		_.forEach(_models, _model => {
			return DbWrapper._registerModel(_model.name, _model.definition);
		});
	}

	static _getModel(_modelName) {
		const _model = _.get(DB.models, _modelName, null);

		if(_model === null) {
			throw new Error(`Initialize ${_modelName} model first!`);
		}

		return _model;
	}

	static _registerController(_modelName) {
		if(_.has(DB.controllers, _modelName)) {
			throw new Error(`Controller ${_modelName} already registered!`);
		}

		_.set(DB.controllers, _modelName, new BaseController(DbWrapper._getModel(_modelName)));
	}

	static _registerOneToOneAssociation(_sourceModel, _targetModel) {
		_sourceModel.hasOne(_targetModel, { 
			foreignKey: `${_sourceModel.name}_id`,
			sourceKey: 'id'
		});

		_targetModel.belongsTo(_sourceModel, {
			foreignKey: `${_sourceModel.name}_id`, 
			targetKey: 'id'
		});
	}

	static _registerOneToManyAssociation(_sourceModel, _targetModel) {
			_sourceModel.hasMany(_targetModel, { 
				foreignKey: `${_sourceModel.name}_id`,
				sourceKey: 'id'
			});

			_targetModel.belongsTo(_sourceModel, {
				foreignKey: `${_sourceModel.name}_id`, 
				targetKey: 'id'
			});
	}

	static _registerManyToManyAssociation(_sourceModel, _targetModel) {
		_sourceModel.belongsToMany(_targetModel, {
			through: pluralize(`${_sourceModel.name}_${_targetModel.name}`),
			foreignKey: `${_sourceModel.name}_id`
		});

		_targetModel.belongsToMany(_sourceModel, {
			through: pluralize(`${_sourceModel.name}_${_targetModel.name}`),
			foreignKey: `${_targetModel.name}_id`
		});
	}

	static _registerModelAssociations(_associations) {
		_.forEach(_associations, _association => {
			const _methodToCall = `_register${_.upperFirst(_association[1])}Association`;
			const _sourceModel = DbWrapper._getModel(_association[0]);
			const _targetModel = DbWrapper._getModel(_association[2]);

			return DbWrapper[_methodToCall](_sourceModel, _targetModel);
		});
	}

	static _registerControllers() {
		_.forEach(DB.models, (_model, _modelName) => {
			return DbWrapper._registerController(_modelName);
		});
	}

	static getController(_controllerName) {
		const _controller = _.get(DB.controllers, _controllerName, null);

		if(_controller === null) {
			throw new Error(`Initialize ${_controllerName} controller first!`);
		}

		return _controller;
	}

	static _initDb(_dbConfig, _tables) {
		if(DB.initialized) {
			throw new Error('Tried to initialize database twice!');
		}

		const _config = _.defaultsDeep({}, _dbConfig, DEFAULT_DB_CONFIG);

		DB.sequelize = new Sequelize(_config.database, _config.username, _config.password, {
			host: _config.host,
			dialect: _config.dialect,
			pool: _config.pool
		});

		DbWrapper._registerModels(_tables.models);
		DbWrapper._registerModelAssociations(_tables.associations);
		DbWrapper._registerControllers();

		return DB.sequelize.authenticate()
			.then(() => {
				DB.initialized = true;
			});
	}

	static initDb() {
		throw new Error('initDb Has to be overriden!');
	}

	static syncDb(_bForceSync) {
		if(!DB.initialized) {
			throw new Error('Initialize database before sync!');
		}

		const _options = {};

		if(_bForceSync === true) {
			_options.force = true;
		}

		return DB.sequelize.sync(_options);
	}
}

module.exports = DbWrapper;