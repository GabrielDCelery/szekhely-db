'use strict';

function customer(_sequelize, _modelName) {
	return _sequelize.define(_modelName, {
		id: {
			type: _sequelize.Sequelize.UUID(),
			defaultValue: _sequelize.Sequelize.UUIDV4,
			primaryKey: true
		},
		version: {
			type: _sequelize.Sequelize.INTEGER().UNSIGNED,
			defaultValue: 0,
			primaryKey: true
		},
		tax_id: {
			type: _sequelize.Sequelize.STRING(20),
			defaultValue: 'new',
			primaryKey: true
		},
		customer_name: {
			type: _sequelize.Sequelize.STRING(255)
		},
		customer_type: {
			type: _sequelize.Sequelize.STRING(10)
		},
		contract_status: {
			type: _sequelize.Sequelize.INTEGER().UNSIGNED
		}
	}, {
		underscored: true
	});
}

module.exports = customer;