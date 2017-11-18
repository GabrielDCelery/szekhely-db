'use strict';

const DatabaseCore = require('./DatabaseCore');

const MODELS = {
    address: {
        name: 'address',
        definition: require('./models/address')
    },
    contract: {
        name: 'contract',
        definition: require('./models/contract')
    },
    contractSigner: {
        name: 'contract_signer',
        definition: require('./models/contractSigner')
    },
    customer: {
        name: 'customer',
        definition: require('./models/customer')
    },
    documentHolder: {
        name: 'document_holder',
        definition: require('./models/documentHolder')
    },
    letterReceiver: {
        name: 'letter_receiver',
        definition: require('./models/letterReceiver')
    },
    email: {
        name: 'email',
        definition: require('./models/email')
    },
    invoice: {
        name: 'invoice',
        definition: require('./models/invoice')
    },
    phone: {
        name: 'phone',
        definition: require('./models/phone')
    },
    postalAuthorization: {
        name: 'postal_authorization',
        definition: require('./models/postalAuthorization')
    },
    serviceProvider: {
        name: 'service_provider',
        definition: require('./models/serviceProvider')
    }
};

const ASSOCIATIONS = {
    customerContracts: {
        type: 'oneToMany',
        source: 'customer',
        target: 'contract'
    },
    customerAuthorizations: {
        type: 'oneToMany',
        source: 'customer',
        target: 'postal_authorization'
    },
    customerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'customer'
    },
    contractSignerContracts: {
        type: 'oneToMany',
        source: 'contract_signer',
        target: 'contract'
    },
    contractSignerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'contract_signer'
    },
    letterReceiverContracts: {
        type: 'oneToMany',
        source: 'letter_receiver',
        target: 'contract'
    },
    letterReceiverAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'letter_receiver'
    },
    serviceProviderContracts: {
        type: 'oneToMany',
        source: 'service_provider',
        target: 'contract'
    },
    serviceProviderAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'service_provider'
    },
    documentHolderContracts: {
        type: 'oneToMany',
        source: 'document_holder',
        target: 'contract'
    },
    documentHolderAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'document_holder'
    },
    contractEmails: {
        type: 'manyToMany',
        source: 'contract',
        target: 'email'
    },
    contractPhones: {
        type: 'manyToMany',
        source: 'contract',
        target: 'phone'
    },
    contractInvoices: {
        type: 'manyToMany',
        source: 'contract',
        target: 'invoice'
    }
};

class SzekhelyDatabase extends DatabaseCore {
    static initDb(_dbConfig) {
        return SzekhelyDatabase._initDb(_dbConfig, {
            models: MODELS,
            associations: ASSOCIATIONS
        });
    }
}

module.exports = SzekhelyDatabase;
