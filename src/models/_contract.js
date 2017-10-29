'use strict';

function contract(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		}
	}, {
		underscored: true
	});
}

module.exports = contract;