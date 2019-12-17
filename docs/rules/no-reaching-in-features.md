# Do not reach into an individual component's folder for nested modules. (no-reaching-in-features)

Components should have everything they need co-located in a single directory. This makes it easy to move components to a more appropriate spot, and easy for future developers to find, understand, and update everything about a component in one place.
The full documentation can be found here : https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592

## Rule Details

This rules prevents developers from reaching into a sub-folder without an index.js.

Examples of **incorrect** code for this rule:

```js
import { UserAccount } from "./user-account/user-account";
import { copyToOneDriveModalRegistration } from "./copy-to-one-drive/copy-to-one-drive-modal/internal";
import { SubscriptionStatus } from "./subscription-status/internal";
import { SubscriptionStatus } from "./subscription-status/actions";
```

Examples of **correct** code for this rule:

```js
import { SubscriptionStatus } from "./assets";
import { SubscriptionStatus } from "./components/subscription-status";
```

## When Not To Use It

If you do not wish to enforce that your code has no reaching, you can safely disable this rule.