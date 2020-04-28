//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/strict-component-boundaries-in-features"),
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

const options = [{ ignore: ["settings"] }];

ruleTester.run("strict-component-boundaries-in-features", rule, {
    valid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { SET_SETTINGS_DOCUMENT } from "@features/settings/settings-page/actions";
            `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { getSettingsSelector } from "@features/settings/settings-page/tenant-stats/public";
            `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { SET_SETTINGS_DOCUMENT } from "@features/settings/settings-page/actions";
            `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { GenericIcon } from "@features/assets";
            `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { getSettingsAction } from "@features/assistant/assistant-page/public";
          `,
            parserOptions,
            options
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { getSettingsAction } from "@features/assistant/assistant-page/actions";
          `,
            errors: [
                {
                    message:
                        "When accessing a file from a different module, only the following files are allowed public.js. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { getSettingsAction } from "@features/settings/settings-page/tenant-stats/actions";
          `,
            errors: [
                {
                    message:
                        "When accessing a file from a different feature, only the following files are allowed public.js. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
            code: `
                import { RandomComponent } from "@features/settings/settings-page/random-component";
          `,
            errors: [
                {
                    message:
                        "When accessing a file from a parent, only the following files are allowed components/{anything}.jsx, assets, layouts/{anything}.jsx, utils/{anything}.js, actions.js, selectors.js. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592."
                }
            ],
            parserOptions
        }
        // {
        //     filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/created-groups-card.jsx",
        //     code: `
        //         import { trackTelemetryAction } from "@features/settings/settings-page/actions";
        //     `,
        //     errors: [
        //         {
        //             message:
        //                 // eslint-disable-next-line max-len
        //                 "When accessing an actions file from a parent, you can only import actions like SET_[something]_DOCUMENT. If you need another action, try moving the action closer to your component or maybe you should create an action that is similar in your own action.js file. trackTelemetryAction is not allowed. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592."
        //         }
        //     ],
        //     parserOptions
        // }
    ]
});
