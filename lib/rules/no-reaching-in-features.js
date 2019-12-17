const { splitPath } = require("../utils/path");
const { getNodeSource } = require("../utils/node");
const { getOptions, getFilePath } = require("../utils/context");
const { isPathInFeature, createPathRelativeToFeature } = require("../utils/apricot-path");
const { sep } = require("path");

const isInExcludedPath = (filePath, excludedPaths) => {
    let isExcluded = false;
    if (!excludedPaths) {
        return isExcluded;
    }

    excludedPaths.forEach(excludedPath => {
        if (filePath.indexOf(createPathRelativeToFeature(excludedPath)) !== -1) {
            isExcluded = true;
        }
    });

    return isExcluded;
};

module.exports = {
    meta: {
        docs: {
            description: "Do not reach into an individual component's folder for nested modules.",
            category: "Strict",
            recommended: false
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    ignore: {
                        type: "array"
                    }
                }
            }
        ]
    },

    create: function(context) {
        const excludedPaths = getOptions(context).ignore;
        const filePath = getFilePath(context);
        const isFeaturePath = isPathInFeature(filePath);

        if (!isFeaturePath || isInExcludedPath(filePath, excludedPaths)) {
            return {};
        }

        const splitAndLog = (node, source) => {
            const parts = splitPath(source);

            if (parts.length === 2) {
                if (parts[0] !== "components") {
                    context.report(node, `Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./${parts[0]}) file instead`);
                }
            } else if (parts.length >= 3) {
                context.report(node, `Do not reach into an individual component's folder for nested modules. Import the file using an index.js (./${parts[0]}) file instead`);
            }
        };

        return {
            ImportDeclaration: function(node) {
                const importSource = getNodeSource(node);
                if (importSource.startsWith(`.${sep}`)) {
                    splitAndLog(node, importSource.substring(2));
                }
            },
            ExportNamedDeclaration: function(node) {
                const exportSource = getNodeSource(node);
                if (exportSource.startsWith(`.${sep}`)) {
                    splitAndLog(node, exportSource.substring(2));
                }
            },
            ExportDefaultDeclaration: function(node) {
                const exportSource = getNodeSource(node);
                if (exportSource.startsWith(`.${sep}`)) {
                    splitAndLog(node, exportSource.substring(2));
                }
            },
            ExportAllDeclaration: function(node) {
                const exportSource = getNodeSource(node);
                if (exportSource.startsWith(`.${sep}`)) {
                    splitAndLog(node, exportSource.substring(2));
                }
            }
        };
    }
};
