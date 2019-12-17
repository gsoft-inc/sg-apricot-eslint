# All reducers.js file must export a registration function named registerReducers (require-register-function-in-reducers)

Sharegate Apricot uses reflection to register reducers to redux. Since a reducer will be ignored if you forget to export a registration function, a feature might not work as intended

## Rule Details

This rules aims to ensure that a reducer registration function is not forgotten in Sharegate Apricot.

Examples of **incorrect** code for this rule:

```js
const INITIAL_STATE = { notificationCount: 0 };

function setNotificationCount(state, payload) {
  state.notificationCount = payload.notificationCount;
}

const reducer = {
  settingsPage: createReducer(INITIAL_STATE, {
      [SET_ALM_SETTINGS_DOCUMENT]: setNotificationCount
    })
};
```

Examples of **correct** code for this rule:

```js
const INITIAL_STATE = { notificationCount: 0 };

function setNotificationCount(state, payload) {
  state.notificationCount = payload.notificationCount;
}

const reducer = {
  settingsPage: createReducer(INITIAL_STATE, {
      [SET_ALM_SETTINGS_DOCUMENT]: setNotificationCount
    })
};

export function registerReducers(registrationContext) {
  registrationContext.registerReducer(reducer);
}
```

## When Not To Use It

This rule is only intended for Sharegate Apricot's client application. If you are using another project, you can safely disable this rule.