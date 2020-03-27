const { getImmediateParentFolderName } = require("../utils/path");
const { getFileName, getFilePath } = require("../utils/context");

module.exports = {
    meta: {
        docs: {
            description: "Assets should be suffixed by Icon, Image or Logo.",
            category: "Strict",
            recommended: false
        },
        fixable: null
    },

    create: function(context) {
        const filePath = getFilePath(context);
        const filename = getFileName(context);
        const isIndexFile = filename === "index.js" || filename === "index.ts";
        const isDirectlyInAssetsFolder = getImmediateParentFolderName(filePath) === "assets";
        if (!isIndexFile || !isDirectlyInAssetsFolder) {
            return {};
        }

        const isValidName = name => {
            return name.endsWith("Icon") || name.endsWith("Image") || name.endsWith("Logo");
        };

        const validateAndReport = (node, name) => {
            if (!isValidName(name)) {
                context.report(
                    node,
                    `The asset named ${name} must have an "Icon", "Image" or "Logo" suffix when exported. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.`
                );
            }
        };

        return {
            ExportNamedDeclaration: function(node) {
                node.specifiers.forEach(specifier => {
                    if (specifier.exported != null) {
                        if (typeof specifier.exported === "string") {
                            validateAndReport(node, specifier.exported);
                        } else if (specifier.exported.name != null) {
                            validateAndReport(node, specifier.exported.name);
                        } else if (specifier.exported.loc != null && specifier.exported.loc.identifierName != null) {
                            validateAndReport(node, specifier.exported.loc.identifierName);
                        }
                    }
                });
            }
        };
    }
};
