const { getOptions, getFilePath } = require("../utils/context");
const { createPathRelativeToFeature } = require("../utils/apricot-path");

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
            description: "Components and PureComponents are not allowed. Use a Functional Component instead.",
            category: "React",
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

        if (isInExcludedPath(filePath, excludedPaths)) {
            return {};
        }

        const isComponent = name => name === "Component" || name === "PureComponent";

        const invalidExtends = node => {
            if (!node.superClass) {
                return false;
            }
            if (node.superClass.name && isComponent(node.superClass.name)) {
                return true;
            }
            if (node.superClass.object && node.superClass.property && node.superClass.object.name === "React" && isComponent(node.superClass.property.name)) {
                return true;
            }

            return false;
        };

        return {
            ClassDeclaration: function(node) {
                if (invalidExtends(node)) {
                    context.report(
                        node,
                        "Do not extend classes [React.]Component and [React.]PureComponent. Use a Functional Component instead. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/759562520."
                    );
                }
            }
        };
    }
};
