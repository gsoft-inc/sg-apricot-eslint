//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/require-register-function-in-handlers"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = { ecmaVersion: 6, sourceType: "module" };
const errors = [
    {
        message: "A function registerHandlers must be exported of files named handlers.js"
    }
];

ruleTester.run("require-register-function-in-handlers", rule, {
    valid: [
        {
            filename: "handlers.js",
            code: `
      function handleGetFiles(dispatch, { type, payload }) {
        if (type !== null) {
          return dispatch(payload.groupId);
        }
      }

      function handleRefreshGroupActivity(dispatch, { type, payload, meta = {} }) {
        return dispatch(payload.groupId, meta.lastWriteTimestamp);
      }

      export function registerHandlers(registrationContext) {
        registrationContext.registerAuthenticatedHandler(handleGetFiles);
        registrationContext.registerAuthenticatedHandler(handleRefreshGroupActivity);
      }
      `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "handlers.js",
            code: `
          function handleGetFiles(dispatch, { type, payload }) {
            return dispatch("refreshGroupFiles");
          }

          function handleRefreshGroupActivity(dispatch, { type, payload, meta = {} }) {
            return dispatch("refreshGroupActivity");
          }
          `,
            errors,
            parserOptions
        }
    ]
});
