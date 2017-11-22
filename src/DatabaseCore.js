'use strict';

const _ = require('lodash');
const pluralize = require('pluralize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const BaseController = require('./BaseController');

const OPERATOR_ALIASES = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const DEFAULT_DB_CONFIG = {
    database: 'database',
    username: 'root',
    password: null,
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: true
};

const DB = {
    controllers: {},
    models: {},
    sequelize: null,
    initialized: false
};

class DatabaseCore {
    static _registerModel(_modelName, _modelDefinition) {
        if (_.has(DB.models, _modelName)) {
            throw new Error(`Model ${_modelName} already registered!`);
        }

        _.set(DB.models, _modelName, _modelDefinition(DB.sequelize, _modelName));
    }

    static _registerModels(_models) {
        _.forEach(_models, _model => {
            return DatabaseCore._registerModel(_model.name, _model.definition);
        });
    }

    static _getModel(_modelName) {
        const _model = _.get(DB.models, _modelName, null);

        if (_model === null) {
            throw new Error(`Initialize ${_modelName} model first!`);
        }

        return _model;
    }

    static _registerController(_modelName) {
        if (_.has(DB.controllers, _modelName)) {
            throw new Error(`Controller ${_modelName} already registered!`);
        }

        _.set(DB.controllers, _modelName, new BaseController(DatabaseCore._getModel(_modelName)));
    }

    static _registerOneToOneAssociation(_sourceModel, _targetModel) {
        _sourceModel.hasOne(_targetModel, {
            foreignKey: `${_sourceModel.name}Id`,
            sourceKey: 'id'
        });

        _targetModel.belongsTo(_sourceModel, {
            foreignKey: `${_sourceModel.name}Id`,
            targetKey: 'id'
        });
    }

    static _registerOneToManyAssociation(_sourceModel, _targetModel) {
        _sourceModel.hasMany(_targetModel, {
            foreignKey: `${_sourceModel.name}Id`,
            sourceKey: 'id'
        });

        _targetModel.belongsTo(_sourceModel, {
            foreignKey: `${_sourceModel.name}Id`,
            targetKey: 'id'
        });
    }

    static _registerManyToManyAssociation(_sourceModel, _targetModel) {
        _sourceModel.belongsToMany(_targetModel, {
            through: pluralize(`${_sourceModel.name}${_.upperFirst(_targetModel.name)}`),
            foreignKey: `${_sourceModel.name}Id`
        });

        _targetModel.belongsToMany(_sourceModel, {
            through: pluralize(`${_sourceModel.name}${_.upperFirst(_targetModel.name)}`),
            foreignKey: `${_targetModel.name}Id`
        });
    }

    static _registerModelAssociations(_associations) {
        _.forEach(_associations, _association => {
            const _methodToCall = `_register${_.upperFirst(_association.type)}Association`;
            const _sourceModel = DatabaseCore._getModel(_association.source);
            const _targetModel = DatabaseCore._getModel(_association.target);

            return DatabaseCore[_methodToCall](_sourceModel, _targetModel);
        });
    }

    static _registerControllers() {
        _.forEach(DB.models, (_model, _modelName) => {
            return DatabaseCore._registerController(_modelName);
        });
    }

    static getController(_controllerName) {
        const _controller = _.get(DB.controllers, _controllerName, null);

        if (_controller === null) {
            throw new Error(`Initialize ${_controllerName} controller first!`);
        }

        return _controller;
    }

    static getSequelize() {
        if (!DB.initialized) {
            throw new Error('Initialize database before trying to get the sequelize isntance!');
        }

        return DB.sequelize;
    }

    static _initDb(_dbConfig, _tables) {
        if (DB.initialized) {
            throw new Error('Tried to initialize database twice!');
        }

        const _config = _.defaultsDeep({}, _dbConfig, DEFAULT_DB_CONFIG);

        DB.sequelize = new Sequelize(_config.database, _config.username, _config.password, {
            operatorAliases: OPERATOR_ALIASES,
            host: _config.host,
            dialect: _config.dialect,
            pool: _config.pool,
            logging: _config.logging
        });

        DatabaseCore._registerModels(_tables.models);
        DatabaseCore._registerModelAssociations(_tables.associations);
        DatabaseCore._registerControllers();

        return DB.sequelize.authenticate()
            .then(() => {
                DB.initialized = true;
            });
    }

    static initDb() {
        throw new Error('initDb Has to be overriden!');
    }

    static resetDb(_bForceSync) {
        if (!DB.initialized) {
            throw new Error('Initialize database before reset!');
        }

        const _options = {};

        if (_bForceSync === true) {
            _options.force = true;
        }

        return DB.sequelize.sync(_options);
    }
}

module.exports = DatabaseCore;
