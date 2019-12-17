const { sanitizePath } = require("./path");
const { basename } = require("path");

const getOptions = context => {
    return context.options[0] || [];
};

const getFilePath = context => {
    return sanitizePath(context.getFilename());
};

const getFileName = context => {
    return basename(getFilePath(context));
};

module.exports = {
    getFilePath,
    getOptions,
    getFileName
};
