//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/strict-assets-name"),
    RuleTester = require("eslint").RuleTester;

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

ruleTester.run("strict-assets-name", rule, {
    valid: [
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
            export { ReactComponent as ClearIcon } from "./icon-clear.svg";
          `,
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
            import ClearImage from "./icon-clear.png";
            import SaveImage from "./icon-save.png";
            export { ClearImage, SaveImage };
          `,
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
            export { ReactComponent as ApricotLogo } from "./apricot-logo.svg";
          `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        export { ReactComponent as Clear } from "./icon-clear.svg";
            `,
            errors: [
                {
                    message:
                        "The asset named Clear must have an \"Icon\", \"Image\" or \"Logo\" suffix when exported. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        export { default as Doctor } from "./doctor.png";
            `,
            errors: [
                {
                    message:
                        "The asset named Doctor must have an \"Icon\", \"Image\" or \"Logo\" suffix when exported. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/assets/index.js",
            code: `
        import Clear from "./icon-clear.png";
        import Save from "./icon-save.png";

        export { Clear, Save };
            `,
            errors: [
                {
                    message:
                        "The asset named Clear must have an \"Icon\", \"Image\" or \"Logo\" suffix when exported. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                },
                {
                    message:
                        "The asset named Save must have an \"Icon\", \"Image\" or \"Logo\" suffix when exported. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                }
            ],
            parserOptions
        }
    ]
});
