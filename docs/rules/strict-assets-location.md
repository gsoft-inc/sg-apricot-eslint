# Assets should be contained within an "assets" folder and available only by an index file. (strict-assets-location)

Components should have all their assets co-located in a single "assets" directory. This makes it easy to move components to a more appropriate spot, and easy for future developers to find, understand, and update everything about the assets in one place.
The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.

## Rule Details

This rules prevents a file to import a svg or png file directly from inside a component.

Examples of **incorrect** code for this rule:

```js
import { ReactComponent as NotificationIcon } from "./assets/notification-icon.svg";

const MyComponent = () => {
  return <NotificationIcon />;
}
```

Examples of **correct** code for this rule:

```js
index.js

export { ReactComponent as NotificationIcon } from "./notification-icon.svg";
```

```js

MyComponent.jsx

import { NotificationIcon } from "./assets";

const MyComponent = () => {
  return <NotificationIcon />;
}
```

## When Not To Use It

If you do not wish to enforce strict assets location, you can safely disable this rule.