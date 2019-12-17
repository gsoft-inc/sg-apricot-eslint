# Assets should be suffixed by Icon, Image or Logo. (strict-assets-name)

Assets should be suffixed by Icon or Image, so it's easy to determine which component is an asset.
The full documentation can be found here : https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.

## Rule Details

This rules prevents a the export of svg and png file if the are not suffixed by Icon, Image or Logo.

Examples of **incorrect** code for this rule:

```js
export { ReactComponent as Notification } from "./notification-icon.svg";

export { default as Doctor } from "./doctor-image.svg";

export { default as Apricot } from "./apricot-logo.svg";
```

Examples of **correct** code for this rule:

```js
export { ReactComponent as NotificationIcon } from "./notification-icon.svg";

export { default as DoctorImage } from "./doctor-image.svg";

export { default as ApricotLogo } from "./apricot-logo.svg";
```

## When Not To Use It

If you do not wish to enforce strict assets names, you can safely disable this rule.