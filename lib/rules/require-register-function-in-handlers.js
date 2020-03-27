const { getAllExportDeclarations } = require("../utils/node");
const { getFileName } = require("../utils/context");
const { FileStartLocation } = require("../utils/constants");

module.exports = {
    meta: {
        docs: {
            description: "All handlers.js file must export a function named registerHandlers",
            category: "Registration",
            recommended: false
        },
        fixable: null
    },

    create: function(context) {
        const fileName = "handlers.js";
        const methodName = "registerHandlers";

        if (getFileName(context) !== fileName && getFileName(context) !== "handlers.ts") {
            return {};
        }
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
