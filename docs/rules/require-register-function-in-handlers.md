# All handlers.js file must export a registration function named registerHandlers (require-register-function-in-handlers)

Sharegate Apricot uses reflection to register handlers to redux. Since a handler will be ignored if you forget to export a registration function, a feature might not work as intended

## Rule Details

This rules aims to ensure that a handler registration function is not forgotten in Sharegate Apricot.

Examples of **incorrect** code for this rule:

```js
function handleRefreshGroupActivity(dispatch, { type, payload, meta = {} }) {
  return dispatch(payload.groupId, meta.lastWriteTimestamp);
}
```

Examples of **correct** code for this rule:

```js
function handleRefreshGroupActivity(dispatch, { type, payload, meta = {} }) {
  return dispatch(payload.groupId, meta.lastWriteTimestamp);
}

export function registerHandlers(registrationContext) {
  registrationContext.registerAuthenticatedHandler(handleRefreshGroupActivity);
}
```

## When Not To Use It

This rule is only intended for Sharegate Apricot's client application. If you are using another project, you can safely disable this rule.