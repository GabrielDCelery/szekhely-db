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
    contractHistory: {
        name: 'contractHistory',
        definition: require('./models/contractHistory')
    },
    contractSigner: {
        name: 'contractSigner',
        definition: require('./models/legalEntity')
    },
    contractSignerHistory: {
        name: 'contractSignerHistory',
        definition: require('./models/legalEntityHistory')
    },
    customer: {
        name: 'customer',
        definition: require('./models/legalEntity')
    },
    customerHistory: {
        name: 'customerHistory',
        definition: require('./models/legalEntityHistory')
    },
    documentHolder: {
        name: 'documentHolder',
        definition: require('./models/legalEntity')
    },
    documentHolderHistory: {
        name: 'documentHolderHistory',
        definition: require('./models/legalEntityHistory')
    },
    letterReceiver: {
        name: 'letterReceiver',
        definition: require('./models/legalEntity')
    },
    letterReceiverHistory: {
        name: 'letterReceiverHistory',
        definition: require('./models/legalEntityHistory')
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
        name: 'postalAuthorization',
        definition: require('./models/postalAuthorization')
    },
    serviceProvider: {
        name: 'serviceProvider',
        definition: require('./models/legalEntity')
    },
    serviceProviderHistory: {
        name: 'serviceProviderHistory',
        definition: require('./models/legalEntityHistory')
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
        target: 'postalAuthorization'
    },
    customerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'customer'
    },
    customerHistory: {
        type: 'oneToMany',
        source: 'customer',
        target: 'customerHistory'
    },
    contractHistory: {
        type: 'oneToMany',
        source: 'contract',
        target: 'contractHistory'
    },
    contractSignerContracts: {
        type: 'oneToMany',
        source: 'contractSigner',
        target: 'contract'
    },
    contractSignerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'contractSigner'
    },
    contractSignerHistory: {
        type: 'oneToMany',
        source: 'contractSigner',
        target: 'contractSignerHistory'
    },
    letterReceiverContracts: {
        type: 'oneToMany',
        source: 'letterReceiver',
        target: 'contract'
    },
    letterReceiverAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'letterReceiver'
    },
    letterReceiverHistory: {
        type: 'oneToMany',
        source: 'letterReceiver',
        target: 'letterReceiverHistory'
    },
    serviceProviderContracts: {
        type: 'oneToMany',
        source: 'serviceProvider',
        target: 'contract'
    },
    serviceProviderAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'serviceProvider'
    },
    serviceProviderHistory: {
        type: 'oneToMany',
        source: 'serviceProvider',
        target: 'serviceProviderHistory'
    },
    documentHolderContracts: {
        type: 'oneToMany',
        source: 'documentHolder',
        target: 'contract'
    },
    documentHolderAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'documentHolder'
    },
    documentHolderHistory: {
        type: 'oneToMany',
        source: 'documentHolder',
        target: 'documentHolderHistory'
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
