const { FileStartLocation } = require("../utils/constants");
const { getFileName } = require("../utils/context");
const { getAllExportDeclarations } = require("../utils/node");

module.exports = {
    meta: {
        docs: {
            description: "All registration.js file must export a register function",
            category: "Registration",
            recommended: false
        },
        fixable: null
    },

    create: function(context) {
        const fileName = "registration.js";
        const methodName = "register";

        if (getFileName(context) !== fileName) {
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
                        message: `A function "register" must be exported of files named ${fileName}`
                    });
                }
            }
        };
    }
};
