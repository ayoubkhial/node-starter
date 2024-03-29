const util = require('util');
const { verify } = require('jsonwebtoken');
const controller = require('api/user/controller.js');
const User = require('api/user/model');
const cache = require('config/cache');
const cacheService = require('config/cache/helper');
const config = require('config/env');
const asyncWrapper = require('utils/async-wrapper.js');
const response = require('utils/response-builder.js');

const routes = [
    {
        path: '/users',
        method: 'GET',
        protect: {
            roles: ['ADMIN'],
            config,
            userModel: User,
            verifyToken: verify
        },
        advancedResult: {
            model: User,
            cacheService: cacheService({ util, client: cache().getClient() })
        },
        cachedResult: {
            collection: 'User',
            method: 'GET',
            type: 'list',
            keys: ['page', 'size', 'sort', 'expand', 'fields'],
            source: 'query',
            cacheService: cacheService({ util, client: cache().getClient() })
        },
        handler: asyncWrapper(async (req, res, next) => {
            return controller.find({ req, res, next, response });
        })
    },
    {
        path: '/users/:id',
        method: 'GET',
        protect: {
            roles: ['ADMIN'],
            config,
            userModel: User,
            verifyToken: verify
        },
        handler: asyncWrapper(async (req, res, next) => {
            return controller.findById({ req, res, next, response, userModel: User });
        })
    },
    {
        path: '/users/:id',
        method: 'PUT',
        handler: asyncWrapper(async (req, res, next) => {
            return controller.updateById({ req, res, next, response, userModel: User });
        })
    },
    {
        path: '/users/:id',
        method: 'DELETE',
        handler: asyncWrapper(async (req, res, next) => {
            return controller.deleteById({ req, res, next, response, userModel: User });
        })
    }
];

module.exports = routes;
