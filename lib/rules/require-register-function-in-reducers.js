const { getAllExportDeclarations } = require("../utils/node");
const { getFileName } = require("../utils/context");
const { FileStartLocation } = require("../utils/constants");

module.exports = {
    meta: {
        docs: {
            description: "All reducers.js file must export a function named registerReducers",
            category: "Registration",
            recommended: false
        },
        fixable: null
    },
    create: function(context) {
        const fileName = "reducers.js";

        if (getFileName(context) !== fileName) {
            return {};
        }

        const methodName = "registerReducers";
        let hasRequiredExportedMethod = false;

        return {
            ExportNamedDeclaration: function(node) {
                if (!hasRequiredExportedMethod) {
                    const declarations = getAllExportDeclarations(node);
                    hasRequiredExportedMethod = declarations.filter(x => x.name === methodName).length >= 1;
                }
            },
            "Program:exit": function() {
                if (!hasRequiredExportedMethod) {
                    context.report({
                        loc: FileStartLocation,
                        message: `A function ${methodName} must be exported of files named ${fileName}`
                    });
                }
            }
        };
    }
};
