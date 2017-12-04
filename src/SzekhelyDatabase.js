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
    customer: {
        name: 'customer',
        definition: require('./models/legalEntity')
    },
    customerHistory: {
        name: 'customerHistory',
        definition: require('./models/legalEntityHistory')
    },
    customerSigner: {
        name: 'customerSigner',
        definition: require('./models/legalEntity')
    },
    customerSignerHistory: {
        name: 'customerSignerHistory',
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
    },
    serviceProviderSigner: {
        name: 'serviceProviderSigner',
        definition: require('./models/legalEntity')
    },
    serviceProviderSignerHistory: {
        name: 'serviceProviderSignerHistory',
        definition: require('./models/legalEntityHistory')
    },
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
    customerSignerContracts: {
        type: 'oneToMany',
        source: 'customerSigner',
        target: 'contract'
    },
    customerSignerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'customerSigner'
    },
    customerSignerHistory: {
        type: 'oneToMany',
        source: 'customerSigner',
        target: 'customerSignerHistory'
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
    serviceProviderSignerContracts: {
        type: 'oneToMany',
        source: 'serviceProviderSigner',
        target: 'contract'
    },
    serviceProviderSignerAddress: {
        type: 'oneToMany',
        source: 'address',
        target: 'serviceProviderSigner'
    },
    serviceProviderSignerHistory: {
        type: 'oneToMany',
        source: 'serviceProviderSigner',
        target: 'serviceProviderSignerHistory'
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
