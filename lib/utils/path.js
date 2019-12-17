const { sep, dirname } = require("path");

const sanitizePath = filePath => {
    return filePath.replace(/\//g, sep).trim();
};

const splitPath = filePath => {
    return sanitizePath(filePath).split(sep);
};

const getImmediateParentFolderName = filePath => {
    const parts = splitPath(dirname(filePath));

    return parts.length >= 1 ? parts.pop() : "";
};

module.exports = {
    sanitizePath,
    splitPath,
    getImmediateParentFolderName
};
