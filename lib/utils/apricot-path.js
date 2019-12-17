const { sep } = require("path");
const { sanitizePath } = require("./path");

const FEATURE_PATH = sanitizePath("/src/app/features");
const FEATURE_ALIAS = "@features";

const isPathInFeature = filePath => {
    return filePath.indexOf(FEATURE_PATH) !== -1;
};

const createPathRelativeToFeature = path => {
    return sanitizePath(FEATURE_PATH + sep + path);
};

const createPathRelativeToFeatureAlias = path => {
    return sanitizePath(FEATURE_ALIAS + sep + path);
};

module.exports = {
    isPathInFeature,
    createPathRelativeToFeature,
    createPathRelativeToFeatureAlias,
    FEATURE_ALIAS,
    FEATURE_PATH
};
