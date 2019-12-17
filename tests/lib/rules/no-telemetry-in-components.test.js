//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/no-telemetry-in-components"),
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

ruleTester.run("no-telemetry-in-components", rule, {
    valid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/activity/activity-feed-page/active/activity-filters.jsx",
            code: `
            import { trackButtonClickTelemetry } from "./actions.js";
          `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/activity/activity-feed-page/active/activity-filters.jsx",
            code: `
            import { trackButtonMixpanelClickTelemetry } from "./actions.js";
          `,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/activity/activity-feed-page/active/actions.js",
            code: `
            import { MIXPANEL_VALUE } from "@contracts/telemetry/mixpanel";
          `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/activity/activity-feed-page/active/activity-filters.jsx",
            code: `
            import { MIXPANEL_VALUE } from "@contracts/telemetry/mixpanel";
            `,
            errors: [
                {
                    message:
                        "Components should not be aware of any telemetry systems. Make sure everything telemetry related are in actions.js files. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/830537888."
                }
            ],
            parserOptions
        }
    ]
});
