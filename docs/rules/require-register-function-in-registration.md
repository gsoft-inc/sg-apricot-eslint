# All registration.js file must export a registration function (require-register-function-in-registration)

Sharegate Apricot uses reflection to register routes. Since a route will be ignored if you forget to export a registration function, a feature might not work as intended

## Rule Details

This rules aims to ensure that an route registration function is not forgotten in Sharegate Apricot.

Examples of **incorrect** code for this rule:

```js
import { configurationPageRegistration } from "./settings-page/internal";

export function settingsRegistration(context) {
    context.registerAuthenticatedPage(configurationPageRegistration);
}

function register(context) {
    context.registerAuthenticatedPage(configurationPageRegistration);
}
```

Examples of **correct** code for this rule:

```js
import { configurationPageRegistration } from "./settings-page/internal";

export function register(context) {
    context.registerAuthenticatedPage(configurationPageRegistration);
}
```

## When Not To Use It

This rule is only intended for Sharegate Apricot's client application. If you are using another project, you can safely disable this rule.