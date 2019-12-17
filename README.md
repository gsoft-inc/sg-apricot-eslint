# sg-apricot-eslint

Sharegate Apricot's custom ESLint plugin.

## Installation

Install the ShareGate recommended ESLint configuration packages.

With NPM:

```json
npm i -D eslint babel-eslint @sharegate/eslint-plugin-apricot
```

## Usage

Add `apricot` to the plugins section of your `.eslintrc.js` configuration file.

```json
{
    "plugins": [
        "@sharegate/apricot"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@sharegate/apricot/rule-name": "warn"
    }
}
```

## Plugin-Provided Rules

Sharegate's plugin provides the following custom rules, which are included as appropriate in all core linting configs:

- [require-register-function-in-handlers](docs/rules/require-register-function-in-handlers.md): All handlers.js file must export a registration function named registerHandlers.
- [require-register-function-in-reducers](docs/rules/require-register-function-in-reducers.md): All reducers.js file must export a registration function named registerReducers.
- [require-register-function-in-registration](docs/rules/require-register-function-in-registration.md) : All registration.js file must export a registration function.
- [no-relative-path-to-parent-directory](docs/rules/no-relative-path-to-parent-directory.md) : Relative path to parent directories in import statements are not allowed.
- [strict-component-boundaries](docs/rules/strict-component-boundaries.md) : Do not reach into an individual component's folder for nested modules.
- [strict-file-names](docs/rules/strict-file-names.md) : Do not name files with names that don't respect the naming convention.
- [no-class-components](docs/rules/no-class-components.md) : Class components are forbidden. Use a Functional Component instead.

## Maintainers

The following documentation is only for the maintainers of this repository.

### Rule Creation

In order to create a new rule, you must manually create 3 new files :

- The rule's definition : lib/rules/RULE_ID.js
- The rule's test file : tests/lib/rules/RULE_ID.test.js
- The rule's documentation: docs/rules/RULE_ID.md

You must also :
- Add the rule's documentation in this README in the Plugin-Provided Rules section.
- Add the rule's configuration in the recommended [config file](lib/configs/recommended.js).

## License

Copyright © 2019, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

