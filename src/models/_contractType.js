'use strict';

function constractType(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		price_of_service_int: {
			type: _sequelize.Sequelize.INTEGER().UNSIGNED,
		},
		has_postal_service: {
			type: _sequelize.Sequelize.INTEGER().UNSIGNED
		}
	}, {
		underscored: true
	});
}

module.exports = constractType;