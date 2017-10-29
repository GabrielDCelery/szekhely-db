'use strict';

function manager(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		manager_name: {
			type: _sequelize.Sequelize.STRING(255)
		},
		manager_id: {
			type: _sequelize.Sequelize.STRING(255)
		},
		manager_mother_name: {
			type: _sequelize.Sequelize.STRING(255)
		},
	}, {
		underscored: true
	});
}

module.exports = manager;