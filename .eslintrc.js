module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js'],
                moduleDirectory: ['node_modules', 'src']
            }
        }
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        'linebreak-style': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|next', ignoreRestSiblings: true }],
        'comma-dangle': [2, 'never'],
        'no-param-reassign': 'off',
        'arrow-parens': 'off',
        indent: ['error', 4],
        'max-len': ['error', 125],
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-useless-escape': 'off',
        'prefer-arrow-callback': 'off',
        'func-names': 'off',
        'newline-per-chained-call': 'off',
        'object-curly-newline': 'off',
        'prefer-destructuring': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        'no-shadow': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want.'
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],
        'no-undef': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'new-cap': 'off',
        'no-nested-ternary': 'off',
        'import/extensions': ['error', 'always', { ignorePackages: true }]
    }
};
