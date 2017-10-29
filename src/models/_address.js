'use strict';

function address(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		postcode: {
			type: _sequelize.Sequelize.INTEGER().UNSIGNED
		},
		address: {
			type: _sequelize.Sequelize.STRING(255)
		}
	}, {
		underscored: true
	});
}

module.exports = address;