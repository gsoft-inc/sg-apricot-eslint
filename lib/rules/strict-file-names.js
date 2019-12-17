const { FileStartLocation } = require("../utils/constants");
const { getOptions, getFileName } = require("../utils/context");

module.exports = {
    meta: {
        docs: {
            description: "# Do not name files with names that don't respect the naming convention.",
            category: "Strict",
            recommended: false
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    fileNameWarnings: {
                        type: "array"
                    }
                }
            }
        ]
    },

    create: function(context) {
        const options = getOptions(context);
        const filename = getFileName(context);

        const generateRestrictionDictionary = warnings => {
            const restrictionDictionary = {};

            if (!warnings) {
                return restrictionDictionary;
            }

            for (let index = 0; index < warnings.length; index++) {
                const option = warnings[index];
                if (option.length === 2) {
                    restrictionDictionary[option[0]] = option[1];
                }
            }

            return restrictionDictionary;
        };

        const generateErrorMessage = correctName => {
            return `File with name ${filename} should be renamed to ${correctName}.`;
        };

        const dictionary = generateRestrictionDictionary(options.warnings);

        return {
            Program: function() {
                if (dictionary.hasOwnProperty(filename)) {
                    context.report({
                        loc: FileStartLocation,
                        message: generateErrorMessage(dictionary[filename])
                    });
                }
            }
        };
    }
};
