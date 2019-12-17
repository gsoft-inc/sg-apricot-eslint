//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-register-function-in-reducers"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const errors = [
    {
        message: "A function registerReducers must be exported of files named reducers.js"
    }
];

const ruleTester = new RuleTester();
const parserOptions = { ecmaVersion: 6, sourceType: "module" };
ruleTester.run("require-register-function-in-reducers", rule, {
    valid: [
        {
            filename: "reducers.js",
            code: `
        import { SET_ALM_SETTINGS_DOCUMENT } from "@features/settings/settings-page/internal";
        import { createReducer } from "@core/redux";

        const INITIAL_STATE = { notificationCount: 0 };

        function setNotificationCount(state, payload) {
          state.notificationCount = payload.lockedState.notificationCount;
        }

        const reducer = {
          settings: {
            settingsPage: {
              lockedRecapCard: createReducer(INITIAL_STATE, {
                [SET_ALM_SETTINGS_DOCUMENT]: setNotificationCount
              })
            }
          }
        };

        export function registerReducers(registrationContext) {
          registrationContext.registerReducer(reducer);
        }
        `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "reducers.js",
            code: `
      import { SET_ALM_SETTINGS_DOCUMENT } from "@features/settings/settings-page/internal";
      import { createReducer } from "@core/redux";

      const INITIAL_STATE = { notificationCount: 0 };

      function setNotificationCount(state, payload) {
        state.notificationCount = payload.lockedState.notificationCount;
      }

      const reducer = {
        settings: {
          settingsPage: {
            lockedRecapCard: createReducer(INITIAL_STATE, {
              [SET_ALM_SETTINGS_DOCUMENT]: setNotificationCount
            })
          }
        }
      };
      `,
            errors,
            parserOptions
        }
    ]
});
