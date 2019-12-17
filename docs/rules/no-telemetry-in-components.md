# Components should not be aware of any type of telemetry systems. (no-telemetry-in-components)

Components should not be aware of any telemetry systems. Everything telemetry related should be scoped in actions.js files. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/830537888.

## Rule Details

This rules prevents imports of the @contracts/telemetry namespaces in component files.

Examples of **incorrect** code for this rule:

```js
// in any .jsx files
import { MIXPANEL_VALUE } from "@contracts/telemetry/mixpanel";
```

Examples of **correct** code for this rule:

```js
// in any .js files
import { MIXPANEL_VALUE } from "@contracts/telemetry/mixpanel";
```

## When Not To Use It

If you do not wish to enforce strict telemetry import rules, you can safely disable this rule.