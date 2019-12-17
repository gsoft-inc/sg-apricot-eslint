//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/strict-assets-location"),
    RuleTester = require("eslint").RuleTester;
const { sanitizePath } = require("../../../lib/utils/path");
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
        jsx: true
    }
};

ruleTester.run("strict-assets-location", rule, {
    valid: [
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        export { ReactComponent as ClearIcon } from "./icon-clear.svg";
      `,
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/MyComponent.jsx",
            code: `
            import { NotificationIcon } from "./assets";

            const MyComponent = () => {
                return <NotificationIcon />;
            }
      `,
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        export { default as ClearImage } from "./image-clear.png";
          `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/MyProject/settings/MyComponent.jsx",
            code: `
        export { ReactComponent as ClearIcon } from "./icon-clear.svg";
          `,
            errors: [
                {
                    message:
                        "Assets can only be exported from an index.js file in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/index.js",
            code: `
        export { ReactComponent as ClearIcon } from "./icon-clear.svg";
          `,
            errors: [
                {
                    message:
                        "index.js files that export assets must be located in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        export { ReactComponent as ClearIcon } from "./images/icon-clear.svg";
          `,
            errors: [
                {
                    message: `Exported assets must be in the same folder as this index.js file in ${sanitizePath(
                        "C:/Dev/MyProject/settings/assets"
                    )}. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.`
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/MyComponent.jsx",
            code: `
        import { ReactComponent as ClearIcon } from "./icon-clear.svg";
          `,
            errors: [
                {
                    message:
                        "Assets can only be imported in an index.js file in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/index.js",
            code: `
        import { ReactComponent as ClearIcon } from "./icon-clear.svg";
          `,
            errors: [
                {
                    message:
                        "index.js files that imports assets must be located in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        import { ReactComponent as ClearIcon } from "./images/icon-clear.svg";
          `,
            errors: [
                {
                    message: `Imported assets must be in the same folder as this index.js file in ${sanitizePath(
                        "C:/Dev/MyProject/settings/assets"
                    )}. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.`
                }
            ],
            parserOptions
        }
    ]
});
