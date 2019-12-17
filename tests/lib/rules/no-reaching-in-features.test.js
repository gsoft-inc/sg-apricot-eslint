//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/no-reaching-in-features"),
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

ruleTester.run("no-reaching-in-features", rule, {
    valid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                    import { SubscriptionStatus } from "./assets";
                `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                    import { SubscriptionStatus } from "./components/subscription-status";
                `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/core/errors/created-groups-card.jsx",
            code: `
                import { UserAccount } from "./user-account/user-account";
                `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                    import { UserAccount } from "./user-account/user-account";
                    `,
            errors: [
                {
                    message: "Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./user-account) file instead"
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                    import { SubscriptionStatus } from "./subscription-status/internal";
                `,
            parserOptions,
            errors: [
                {
                    message: "Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./subscription-status) file instead"
                }
            ]
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                    import { copyToOneDriveModalRegistration } from "./copy-to-one-drive/copy-to-one-drive-modal/internal";
                    `,
            errors: [
                {
                    message: "Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./copy-to-one-drive) file instead"
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/assistant/assistant-page/created-groups-card.jsx",
            code: `
                import { SubscriptionStatus } from "./assets/Doctor.png";
            `,
            errors: [
                {
                    message: "Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./assets) file instead"
                }
            ],
            parserOptions
        }
    ]
});
