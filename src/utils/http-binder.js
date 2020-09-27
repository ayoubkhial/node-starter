import advancedResult from '../middleware/advanced-result';

const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

const addMiddleware = (args, middleware) => {
    const index = args.length - 1;
    const newArgs = insert(args, index, middleware);
    return newArgs;
};

const binder = (app, routes) => {
    for (const route of routes) {
        let args = [route.path, route.handler];
        if (route?.advancedResult) args = addMiddleware(args, advancedResult(route?.advancedResult?.model));
        app[route.method.toLowerCase()](...args);
    }
    return app;
};

export default binder;
