const { extname, basename, sep } = require("path");
const { getNodeSource } = require("../utils/node");
const { getFilePath } = require("../utils/context");

module.exports = {
    meta: {
        docs: {
            description: "Relative path to parent directories in import statements are not allowed.",
            category: "Imports",
            recommended: false
        },
        fixable: null
    },

    create: function(context) {
        const filename = getFilePath(context);
        const ext = extname(filename);
        if (ext !== ".jsx" && ext !== ".tsx" && ext !== ".js" && ext !== ".ts") {
            return {};
        }

        return {
            ImportDeclaration: function(node) {
                const importSource = getNodeSource(node);
                if (importSource.includes(`..${sep}`)) {
                    context.report(
                        node,
                        `Relative path to parent directories in import statements are not allowed. If you want to import an action or a component from a parent directory, please either use aliases in the import path or move ${basename(
                            filename
                        )} to same directory as ${importSource}`
                    );
                }
            }
        };
    }
};
