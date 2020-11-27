const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

const addMiddleware = (args, middleware) => {
    const index = args.length - 1;
    const newArgs = insert(args, index, middleware);
    return newArgs;
};

const binder = ({ app, routes, middleware, config, cacheService, userModel }) => {
    for (const route of routes) {
        let args = [route.path, route.handler];
        if (route?.protected)
            args = addMiddleware(args, middleware.protect({ roles: route?.protected?.roles, config, userModel }));
        if (route?.limit) args = addMiddleware(args, middleware.rateLimiter(route?.limit));
        if (route?.cachedResult)
            args = addMiddleware(args, middleware.cachedResult({ ...route?.cachedResult, cacheService }));
        if (route?.advancedResult)
            args = addMiddleware(args, middleware.advancedResult({ model: route?.advancedResult?.model, cacheService }));
        if (route?.clearCache) args = addMiddleware(args, middleware.clearCache({ ...route?.clearCache, cacheService }));
        app[route.method.toLowerCase()](...args);
    }
    return app;
};

module.exports = binder;
