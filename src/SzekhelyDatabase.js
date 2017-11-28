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
    signer: {
        name: 'signer',
        definition: require('./models/legalEntity')
    },
    signerHistory: {
        name: 'signerHistory',
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
    holder: {
        name: 'holder',
        definition: require('./models/legalEntity')
    },
    holderHistory: {
        name: 'holderHistory',
        definition: require('./models/legalEntityHistory')
    },
    recipient: {
        name: 'recipient',
        definition: require('./models/legalEntity')
    },
    recipientHistory: {
        name: 'recipientHistory',
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
    signerContracts: {
        type: 'oneToMany',
        source: 'signer',
        target: 'contract'
    },
    signerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'signer'
    },
    signerHistory: {
        type: 'oneToMany',
        source: 'signer',
        target: 'signerHistory'
    },
    recipientContract: {
        type: 'oneToMany',
        source: 'recipient',
        target: 'contract'
    },
    recipientAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'recipient'
    },
    recipientHistory: {
        type: 'oneToMany',
        source: 'recipient',
        target: 'recipientHistory'
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
    holderContracts: {
        type: 'oneToMany',
        source: 'holder',
        target: 'contract'
    },
    holderAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'holder'
    },
    holderHistory: {
        type: 'oneToMany',
        source: 'holder',
        target: 'holderHistory'
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
