'use strict';

function serviceProvider(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		company_name: {
			type: _sequelize.Sequelize.STRING(255),
			unique: true
		},
		company_register_id: {
			type: _sequelize.Sequelize.STRING(255),
			unique: true
		},
		company_tax_id: {
			type: _sequelize.Sequelize.STRING(255),
			unique: true
		}
	}, {
		underscored: true
	});
}

module.exports = serviceProvider;