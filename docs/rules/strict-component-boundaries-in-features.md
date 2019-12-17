# Do not reach into an individual component's folder for nested modules. (strict-component-boundaries-in-features)

Modules should have everything they need co-located in a single directory. If they require something from other modules, it should be imported properly.
The full documentation can be found here : https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592

## Rule Details

This rule prevents developers from importing files from another modules that they shouldn't

### files allowed to be imported between modules :
- **public.js** : Only public files can be imported from other features or modules


### files allowed to be imported in the direct parent hierarchy :
- **assets** : Assets can be defined at the root of a module. It's ok for any component in @settings/settings-page to use @features/settings/settings-page/assets or @features/settings/assets.
- **actions.js** *ONLY SPECIFIC ACTIONS* : A component should not need to access actions defined by a parent. The ONLY exception is the SET_[any]_DOCUMENT actions. It goes with the decision of allowing reducers to be split, instead of having a huge one at the root of the module.
- **utils** : In some cases, we want to use utils method across an entire modules. For instance, the generateDownloadLink in @features/archive/utils/download is used multiple times in the @features/archive module.
- **layouts/** : In some cases, we want to create a new layout, other than using the ones in @features/layouts. It's ok for pages in @features/licensing to use @features/licensing/layouts.
- **components/** : In some cases, we want to create reusable components for your module. If you can, prefer scoping your components only where you need them. If you need to reuse them accross your modules, add them to a components folder. It's ok for pages in @features/licensing to use @features/licensing/components/X.







Examples of **incorrect** code for this rule:

```js
import { requestEntrust } from "@features/onboarding/entrust";
import { requestEntrust } from "@features/onboarding/entrust/actions";
import { openArchiveGroupDetailsModal } from "@features/archive/group-details-modal";
```

Examples of **correct** code for this rule:

```js

import { getDoNotDisturbListSelector } from "@features/settings/settings-page/selectors";
import { SETTINGS_FILTER_TYPE } from "@features/settings/settings-page/enums";
import { settingsType } from "@features/settings/settings-page/types";
import { SectionSeparator } from "@features/settings/settings-page/components/section-separator";
import { openArchiveGroupDetailsModal } from "@features/archive/group-details-modal/modal-actions";


// The following examples are valid only if the file that is importing is in the same folder hierarchy, for instance if the path is C:\\Dev\\Sharegate.Gravt\\src\\frontend\\client\\src\\app\\features\\settings\\settings-page\\entrust\\entrust-section.jsx)

// only actions with SET_[documentName]_DOCUMENT are allowed to be imported by children
import { SET_SETTINGS_DOCUMENT } from "@features/settings/settings-page/actions";

// assets should only be imported by children, never by other modules or features
import { NotificationSilencedIcon } from "@features/settings/settings-page/assets";

```

## When Not To Use It

If you do not wish to enforce strict component boundaries, you can safely disable this rule.