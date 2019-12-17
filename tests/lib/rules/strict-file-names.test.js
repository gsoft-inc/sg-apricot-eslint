//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/strict-file-names"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
        jsx: true
    }
};

const options = [
    {
        warnings: [["handler.js", "handlers.js"], ["reducer.js", "reducers.js"], ["action.js", "actions.js"], ["selector.js", "selectors.js"], ["registrations.js", "registration.js"]]
    }
];

const generateErrorMessage = (filename, correctName) => {
    return [{ message: `File with name ${filename} should be renamed to ${correctName}.` }];
};

ruleTester.run("strict-file-names", rule, {
    valid: [
        {
            filename: "handlers.js",
            code: `
                import { SubscriptionStatus } from "./subscription-status/internal";
            `,
            parserOptions,
            options
        },
        {
            filename: "reducers.js",
            code: `
                import { SubscriptionStatus } from "./subscription-status/actions";
            `,
            parserOptions,
            options
        },
        {
            filename: "actions.js",
            code: `
                import { SubscriptionStatus } from "./assets/image.svg";
            `,
            parserOptions,
            options
        },
        {
            filename: "registration.js",
            code: `
                import { SubscriptionStatus } from "./components/subscription-status";
            `,
            parserOptions,
            options
        },
        {
            filename: "selectors.js",
            code: `
                import { SubscriptionStatus } from "./components/subscription-status";
            `,
            parserOptions,
            options
        }
    ],

    invalid: [
        {
            filename: "handler.js",
            code: `
        import { SubscriptionStatus } from "./subscription-status/internal";
      `,
            parserOptions,
            options,
            errors: generateErrorMessage("handler.js", "handlers.js")
        },
        {
            filename: "reducer.js",
            code: `
        import { SubscriptionStatus } from "./subscription-status/actions";
      `,
            parserOptions,
            options,
            errors: generateErrorMessage("reducer.js", "reducers.js")
        },
        {
            filename: "action.js",
            code: `
        import { SubscriptionStatus } from "./assets/image.svg";
      `,
            parserOptions,
            options,
            errors: generateErrorMessage("action.js", "actions.js")
        },
        {
            filename: "registrations.js",
            code: `
        import { SubscriptionStatus } from "./components/subscription-status";
      `,
            parserOptions,
            options,
            errors: generateErrorMessage("registrations.js", "registration.js")
        },
        {
            filename: "selector.js",
            code: `
        import { SubscriptionStatus } from "./components/subscription-status";
      `,
            parserOptions,
            options,
            errors: generateErrorMessage("selector.js", "selectors.js")
        }
    ]
});
