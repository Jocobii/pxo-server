module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'airbnb-base',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        camelcase: 'off',
        'linebreak-style': 0,
    },
};
