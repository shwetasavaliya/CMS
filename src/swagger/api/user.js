const securityObject = [{ authenticate: [] }];
const swaggerHelpers = require('../swagger-helper');

module.exports = {
    '/user/register': {
        post: {
            tags: ['Users'],
            description: 'user register endpoint',
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
                            "email": {
                                "type": "string",
                                "example": "kaushikgangani94@gmail.com"
                            },
                            "password": {
                                "type": "string",
                                "example": "kaushik1234"
                            },
                            "firstName": {
                                "type": "string",
                                "example": "kaushik"
                            },
                            "middleName": {
                                "type": "string",
                                "example": "S"
                            },
                            "lastName": {
                                "type": "string",
                                "example": "Gangani"
                            },
                            "userName": {
                                "type": "string",
                                "example": "123"
                            },
                            "phone": {
                                "type": "string",
                                "example": "32666299232"
                            },
                            "city": {
                                "type": "string",
                                "example": "surat"
                            },
                            "state": {
                                "type": "string",
                                "example": "Gujrat"
                            },
                            "country": {
                                "type": "string",
                                "example": "India"
                            },
                            "companyName": {
                                "type": "string",
                                "example": "realloc"
                            },
                            "companyEmail": {
                                "type": "string",
                                "example": "reallocinfotech123@gmail.com"
                            },
                            "companyAddress": {
                                "type": "string",
                                "example": "siver point"
                            },
                            "companyMobile": {
                                "type": "string",
                                "example": "9234567398"
                            },
                            "companyGstNo": {
                                "type": "string",
                                "example": "kaushik2565"
                            },
                            "companyPanNo": {
                                "type": "string",
                                "example": "88778ABCDE"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            }
        }
    },
    
    '/user/login': {
        post: {
            tags: ['Users'],
            description: 'user login endpoint',
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
                            "email": {
                                "type": "string",
                                "example": "kaushikgangani940906@gmail.com"
                            },
                            "password": {
                                "type": "string",
                                "example": "kaushik12345"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            }
        }
    },

    '/user/update': {
        put: {
            tags: ['Users'],
            description: 'user update endpoint',
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
                            "email": {
                                "type": "string",
                                "example": "kaushikgangani940906@gmail.com"
                            },
                            "password": {
                                "type": "string",
                                "example": "kaushik12345"
                            },
                            "firstName": {
                                "type": "string",
                                "example": "kaushik"
                            },
                            "middleName": {
                                "type": "string",
                                "example": "S"
                            },
                            "lastName": {
                                "type": "string",
                                "example": "Gangani"
                            },
                            "userName": {
                                "type": "string",
                                "example": "123"
                            },
                            "phone": {
                                "type": "string",
                                "example": "32666299232"
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

    '/user/check-user-email': {
        post: {
            tags: ['Users'],
            description: 'user checkuseremail endpoint',
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
                            "email": {
                                "type": "string",
                                "example": "kaushikgangani940906@gmail.com"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            },
        }
    },

    '/user/forgot-password/{token}': {
        post: {
            tags: ['Users'],
            description: 'user forgotpassword endpoint',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'token',
                    required: true,
                },
                {
                    in: 'body',
                    name: 'Data',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            "email": {
                                "type": "string",
                                "example": "kaushikgangani940906@gmail.com"
                            },
                            "password": {
                                "type": "string",
                                "example": "kaushik12345"
                            }
                        }
                    }
                }
            ],
            responses: {
                '200': swaggerHelpers.responseObject['200']
            }
        }
    },

    '/user/change-password': {
        put: {
            tags: ['Users'],
            description: 'user changepassword endpoint',
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
                            "oldPassword": {
                                "type": "string",
                                "example": "kaushik12345"
                            },
                            "newPassword": {
                                "type": "string",
                                "example": "kaushik1234"
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
    }
}
