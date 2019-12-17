//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-register-function-in-registration"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const errors = [
    {
        message: "A function \"register\" must be exported of files named registration.js"
    }
];

const ruleTester = new RuleTester();
const parserOptions = { ecmaVersion: 6, sourceType: "module" };
ruleTester.run("require-register-function-in-registration", rule, {
    valid: [
        {
            filename: "anythingelse.js",
            code: `
        import { configurationPageRegistration } from "./settings-page/internal";

        function register(context) {
            context.registerAuthenticatedPage(configurationPageRegistration);
        }
        `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "registration.js",
            code: `
        import { configurationPageRegistration } from "./settings-page/internal";

        function settingsRegistration(context) {
            context.registerAuthenticatedPage(configurationPageRegistration);
        }
      `,
            errors,
            parserOptions
        },
        {
            filename: "registration.js",
            code: `
        import { configurationPageRegistration } from "./settings-page/internal";

        export function settingsRegistration(context) {
            context.registerAuthenticatedPage(configurationPageRegistration);
        }
        `,
            errors,
            parserOptions
        }
    ]
});
