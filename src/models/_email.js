'use strict';

function email(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		email: {
			type: _sequelize.Sequelize.STRING(255)
		},
		status: {
			type: _sequelize.Sequelize.INTEGER.UNSIGNED
		}
	}, {
		underscored: true
	});
}

module.exports = email;