const authModule = ({ app, binder, routes, middleware }) => {
    return binder({ app, routes, middleware });
};

module.exports = authModule;
