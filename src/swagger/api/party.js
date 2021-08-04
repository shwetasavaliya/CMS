const securityObject = [{ authenticate: [] }];
const swaggerHelpers = require('../swagger-helper');

module.exports = {
    '/party/add-party': {
        post: {
            tags: ['Parties'],
            description: 'party added endpoint',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Data',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            "partyFirstName": {
                                "type": "string",
                                "example": "kaushik"
                            },
                            "partyMiddleName": {
                                "type": "string",
                                "example": "s"
                            },
                            "partyLastName": {
                                "type": "string",
                                "example": "gangani"
                            },
                            "partyCompanyName": {
                                "type": "string",
                                "example": "realloc"
                            },
                            "partyMobile": {
                                "type": "string",
                                "example": "9854245200"
                            },
                            "partyCompanyMobile": {
                                "type": "string",
                                "example": "9685123470"
                            },
                            "partyGstNo": {
                                "type": "string",
                                "example": "8852051250"
                            },
                            "partyPanNo": {
                                "type": "string",
                                "example": "7895925"
                            },
                            "partyAadharCardNo": {
                                "type": "string",
                                "example": "1234567895"
                            },
                            "bankName": {
                                "type": "string",
                                "example": "bank of baroda"
                            },
                            "bankAccountNo": {
                                "type": "string",
                                "example": "88955775656"
                            },
                            "bankAccountType": {
                                "type": "string",
                                "example": "saving"
                            },
                            "bankIFSCCode": {
                                "type": "string",
                                "example": "BOI0123456"
                            },
                            "bankBranchAddress": {
                                "type": "string",
                                "example": "surat"
                            },
                            "contactPersonName": {
                                "type": "string",
                                "example": "pradip"
                            },
                            "contactPersonMobile": {
                                "type": "string",
                                "example": "7894561230"
                            },
                            "contactPersonEmail": {
                                "type": "string",
                                "example": "pradip@gmail.com"
                            },
                            "contactPersonAddress": {
                                "type": "string",
                                "example": "gujrat"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            },
            security: securityObject
        }
    },
    '/party/update-party-data': {
        put: {
            tags: ['Parties'],
            description: 'party update endpoint',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Data',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            "_id": {
                                "type": "string",
                                "example": "60f79e53424a3412b0c0bbd5"
                            },
                            "partyFirstName": {
                                "type": "string",
                                "example": "kaushik"
                            },
                            "partyMiddleName": {
                                "type": "string",
                                "example": "s"
                            },
                            "partyLastName": {
                                "type": "string",
                                "example": "gangani"
                            },
                            "partyCompanyName": {
                                "type": "string",
                                "example": "realloc"
                            },
                            "partyMobile": {
                                "type": "string",
                                "example": "9854245200"
                            },
                            "partyCompanyMobile": {
                                "type": "string",
                                "example": "9685123470"
                            },
                            "partyGstNo": {
                                "type": "string",
                                "example": "8852051250"
                            },
                            "partyPanNo": {
                                "type": "string",
                                "example": "7895925"
                            },
                            "partyAadharCardNo": {
                                "type": "string",
                                "example": "1234567895"
                            },
                            "bankName": {
                                "type": "string",
                                "example": "bank of baroda"
                            },
                            "bankAccountNo": {
                                "type": "string",
                                "example": "88955775656"
                            },
                            "bankAccountType": {
                                "type": "string",
                                "example": "saving"
                            },
                            "bankIFSCCode": {
                                "type": "string",
                                "example": "BOI0123456"
                            },
                            "bankBranchAddress": {
                                "type": "string",
                                "example": "surat"
                            },
                            "contactPersonName": {
                                "type": "string",
                                "example": "pradip"
                            },
                            "contactPersonMobile": {
                                "type": "string",
                                "example": "7894561230"
                            },
                            "contactPersonEmail": {
                                "type": "string",
                                "example": "pradip@gmail.com"
                            },
                            "contactPersonAddress": {
                                "type": "string",
                                "example": "gujrat"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            },
            security: securityObject
        },
    },
    '/party/delete-party-data': {
        delete: {
            tags: ['Parties'],
            description: 'party delete endpoint',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Data',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            "_id": {
                                "type": "string",
                                "example": "60f7bea1bac15036501b8fdb"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            },
            security: securityObject
        },
    },
    '/party/get-party-data': {
        get: {
            tags: ['Parties'],
            description: 'party delete endpoint',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            },
            security: securityObject
        },
    }
}
