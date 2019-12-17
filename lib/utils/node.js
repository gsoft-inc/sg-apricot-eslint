const { sanitizePath } = require("./path");

const getAllExportDeclarations = node => {
    let declarations = [];
    if (node.declaration == null) {
        return;
    }
    if (node.declaration.id != null) {
        declarations = [...declarations, node.declaration.id];
    }

    if (node.declaration.declarations != null) {
        for (const declaration of node.declaration.declarations) {
            if (declaration != null && declaration.id != null) {
                declarations = [...declarations, declaration.id];
            }
        }
    }

    return declarations;
};

const getNodeSource = node => {
    return sanitizePath(node.source != null ? node.source.value : "");
};

const getAllImportSpecifiers = node => {
    let specifiers = [];
    if (node.specifiers != null) {
        node.specifiers.forEach(specifier => {
            if (specifier.imported != null) {
                specifiers = [...specifiers, specifier.imported.name];
            }
        });
    }

    return specifiers;
};

module.exports = {
    getAllExportDeclarations,
    getAllImportSpecifiers,
    getNodeSource
};
