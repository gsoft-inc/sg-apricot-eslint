const { extname, dirname } = require("path");
const { splitPath, getImmediateParentFolderName, sanitizePath } = require("../utils/path");
const { getNodeSource } = require("../utils/node");
const { getFileName, getFilePath } = require("../utils/context");

module.exports = {
    meta: {
        docs: {
            description: "Assets should be contained within an \"assets\" folder and available only by an index file.",
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

        const isAsset = source => {
            const importExtension = extname(source);

            return importExtension === ".svg" || importExtension === ".png";
        };

        const isAssetInSameFolder = source => {
            return splitPath(source).length <= 2; // ./myImage.svg
        };

        return {
            ImportDeclaration: function(node) {
                const importSource = getNodeSource(node);

                if (isAsset(importSource)) {
                    const assetIsInSameFolder = isAssetInSameFolder(importSource); // ./myImage.svg

                    if (!isIndexFile) {
                        context.report(
                            node,
                            "Assets can only be imported in an index.js file in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                        );
                    } else if (!isDirectlyInAssetsFolder) {
                        context.report(
                            node,
                            "index.js files that imports assets must be located in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                        );
                    } else if (!assetIsInSameFolder) {
                        context.report(
                            node,
                            `Imported assets must be in the same folder as this ${filename} file in ${sanitizePath(
                                dirname(filePath)
                            )}. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.`
                        );
                    }
                }
            },
            ExportNamedDeclaration: function(node) {
                const exportSource = getNodeSource(node);

                if (isAsset(exportSource)) {
                    const assetIsInSameFolder = isAssetInSameFolder(exportSource);

                    if (!isIndexFile) {
                        context.report(
                            node,
                            "Assets can only be exported from an index.js file in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                        );
                    } else if (!isDirectlyInAssetsFolder) {
                        context.report(
                            node,
                            "index.js files that export assets must be located in an \"assets\" folder. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822."
                        );
                    } else if (!assetIsInSameFolder) {
                        context.report(
                            node,
                            `Exported assets must be in the same folder as this ${filename} file in ${sanitizePath(
                                dirname(filePath)
                            )}. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/817201822.`
                        );
                    }
                }
            }
        };
    }
};
