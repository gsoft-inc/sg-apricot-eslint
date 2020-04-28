const { splitPath } = require("../utils/path");
const { getAllImportSpecifiers, getNodeSource } = require("../utils/node");
const { getOptions, getFilePath } = require("../utils/context");
const { isPathInFeature, FEATURE_ALIAS, FEATURE_PATH, createPathRelativeToFeature, createPathRelativeToFeatureAlias } = require("../utils/apricot-path");
const { relative } = require("path");

const ALLOWED_FILES_OTHER_MODULES = [
    {
        name: "public",
        displayName: "public.js"
    }
];

const ALLOWED_FILES_DIRECT_PARENT = [
    {
        name: "components",
        displayName: "components/{anything}.jsx"
    },
    {
        name: "assets",
        displayName: "assets"
    },
    {
        name: "layouts",
        displayName: "layouts/{anything}.jsx"
    },
    {
        name: "utils",
        displayName: "utils/{anything}.js"
    },
    {
        name: "actions",
        displayName: "actions.js",
        exportedItemRestrictionRegex: /^SET_.*_DOCUMENT$/g,
        exportedItemRestrictionExplanation:
            "When accessing an actions file from a parent, you can only import actions like SET_[something]_DOCUMENT. If you need another action, try moving the action closer to your component or maybe you should create an action that is similar in your own action.js file."
    },
    {
        name: "selectors",
        displayName: "selectors.js"
    }
];

const genericFolders = ["assets", "components", "layouts", "utils"];
const excludedFeaturesImports = genericFolders.map(x => createPathRelativeToFeatureAlias(x));

const isExcludedFeatureImport = source => {
    return excludedFeaturesImports.some(x => source.startsWith(x));
};

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

const IMPORT_TYPE = {
    DIRECT_PARENT: "DIRECT_PARENT",
    ANOTHER_MODULE: "ANOTHER_MODULE",
    SAME_MODULE: "SAME_MODULE"
};
const getImportType = (filePath, source) => {
    const convertedPath = FEATURE_ALIAS + filePath.substring(filePath.indexOf(FEATURE_PATH) + FEATURE_PATH.length);
    const relToFeatures = relative(source, FEATURE_ALIAS);
    const relToFile = relative(source, convertedPath);
    const relFromFile = relative(convertedPath, source);
    const isInAnotherModule = relToFile.startsWith(relToFeatures);
    if (isInAnotherModule) {
        return IMPORT_TYPE.ANOTHER_MODULE;
    } else {
        const partsExcludingDots = splitPath(relFromFile).filter(x => x !== "..");
        const isDirectParent = partsExcludingDots.length <= 1;
        if (isDirectParent) {
            return IMPORT_TYPE.DIRECT_PARENT;
        } else {
            if (partsExcludingDots.length === 2) {
                if (genericFolders.some(x => x === partsExcludingDots[0])) {
                    return IMPORT_TYPE.DIRECT_PARENT;
                }
            }

            return IMPORT_TYPE.SAME_MODULE;
        }
    }
};

const getErrorMessagePrefix = importType => {
    if (importType === IMPORT_TYPE.DIRECT_PARENT) {
        return "When accessing a file from a parent";
    } else if (importType === IMPORT_TYPE.ANOTHER_MODULE) {
        return "When accessing a file from a different module";
    } else if (importType === IMPORT_TYPE.SAME_MODULE) {
        return "When accessing a file from a different feature";
    }

    return "";
};

const getAllowedFilesByImportType = importType => {
    if (importType === IMPORT_TYPE.DIRECT_PARENT) {
        return ALLOWED_FILES_DIRECT_PARENT;
    } else {
        return ALLOWED_FILES_OTHER_MODULES;
    }
};

module.exports = {
    meta: {
        docs: {
            description: "Do not import restricted files from other modules.",
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

        const logIfImportedSpecifierNotAllowed = (node, allowedSegments, allowedFiles) => {
            const specifiers = getAllImportSpecifiers(node);

            if (specifiers != null) {
                allowedSegments.forEach(segment => {
                    const file = allowedFiles.filter(x => x.name === segment)[0];

                    if (file.hasOwnProperty("exportedItemRestrictionRegex") && file.exportedItemRestrictionRegex != null) {
                        specifiers.forEach(x => {
                            const matches = x.match(file.exportedItemRestrictionRegex);

                            if (matches == null || matches.length === 0) {
                                context.report(
                                    node,
                                    `${
                                        file.hasOwnProperty("exportedItemRestrictionExplanation") ? file.exportedItemRestrictionExplanation : ""
                                    } ${x} is not allowed. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592.`
                                );
                            }
                        });
                    }
                });
            }
        };

        const logIfFileNotAllowed = (node, importPathSegments, importType) => {
            const allowedFiles = getAllowedFilesByImportType(importType);
            const allowedSegments = importPathSegments.filter(x => allowedFiles.map(y => y.name).includes(x));

            if (allowedSegments.length === 0) {
                const allowedFilesMessage = allowedFiles.map(x => x.displayName).join(", ");

                context.report(
                    node,
                    `${getErrorMessagePrefix(
                        importType
                    )}, only the following files are allowed ${allowedFilesMessage}. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/826704592.`
                );
            } else {
                logIfImportedSpecifierNotAllowed(node, allowedSegments, allowedFiles);
            }
        };

        return {
            ImportDeclaration: function(node) {
                const importSource = getNodeSource(node);

                if (importSource.startsWith(FEATURE_ALIAS) && !isExcludedFeatureImport(importSource)) {
                    const importType = getImportType(filePath, importSource);
                    const importSegments = splitPath(importSource);

                    logIfFileNotAllowed(node, importSegments, importType);
                }
            }
        };
    }
};
