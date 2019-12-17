const { sep } = require("path");
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/no-relative-path-to-parent-directory"),
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
const errors = [
    {
        message:
            "Relative path to parent directories in import statements are not allowed. If you want to import an action or a component from a parent directory, please either use aliases in the import path or move created-groups-card.jsx to same directory as " +
            `..${sep}..${sep}created-groups${sep}created-groups-card-inner`
    }
];

ruleTester.run("no-relative-path-to-parent-directory", rule, {
    valid: [
        {
            filename: "created-groups-card.jsx",
            code: `
        import { CreatedGroupsCard } from "@features/assistant/assistant-page/active/cards-list/created-groups/created-groups-card-inner";
      `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "created-groups-card.jsx",
            code: `
        import { CreatedGroupsCard } from "../../created-groups/created-groups-card-inner";
          `,
            errors,
            parserOptions
        }
    ]
});
