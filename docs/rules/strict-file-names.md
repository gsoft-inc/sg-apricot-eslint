# Do not name files with names that don't respect the naming convention. (strict-file-names)

## Rule Details

This rules enforce a certain file naming convention.
The convention can be configured the rule options.

### Options

This rule takes an array of arrays as an option. That option allows you to specify any set of the naming conventions to respect:

#### Suggested Default Options
```js
        "@sharegate/apricot/strict-file-names": [
            "warn",
            [
                ["handler.js", "handlers.js"], // files named handler.js will be in warning, and the rule suggest to rename the file to handlers.js
                ["reducer.js", "reducers.js"],
                ["registrations.js", "registration.js"],
                ["action.js", "actions.js"],
            ]
        ],
```

Examples of **incorrect** code for this rule with the suggested options:

```js
/settings-page
----action.js
----reducer.js
----handler.js
----registrations.js
```

Examples of **correct** code for this rule  with the suggested options:

```js
/settings-page
----actions.js
----reducers.js
----handlers.js
----registration.js
```

## When Not To Use It

If you do not wish to enforce strict file naming convention, you can safely disable this rule.