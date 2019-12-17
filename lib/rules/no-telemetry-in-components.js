const { extname, sep } = require("path");
const { getNodeSource } = require("../utils/node");
const { getFileName } = require("../utils/context");

module.exports = {
    meta: {
        docs: {
            description: "Components should not be aware of any type of telemetry systems.",
            category: "Strict",
            recommended: false
        },
        fixable: null
    },

    create: function(context) {
        const filename = getFileName(context);
        const isJsxFile = extname(filename) === ".jsx";
        if (!isJsxFile) {
            return {};
        }
        const isTelemetryImport = source => {
            return source.startsWith(`@contracts${sep}telemetry`);
        };

        return {
            ImportDeclaration: function(node) {
                const importSource = getNodeSource(node);
                if (isTelemetryImport(importSource)) {
                    context.report(
                        node,
                        "Components should not be aware of any telemetry systems. Make sure everything telemetry related are in actions.js files. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/830537888."
                    );
                }
            }
        };
    }
};
