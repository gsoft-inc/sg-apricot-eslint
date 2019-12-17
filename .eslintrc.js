module.exports = {
    extends: [
        "@sharegate/eslint-config-recommended",
        "@sharegate/eslint-config-sort-imports",
        "@sharegate/eslint-config-strict",
    ],
    globals: {
        CONFIG: true,
        "process": true,
        "require": true,
    },
    env: {
        "es6": true,
        "node": true
    },
};
