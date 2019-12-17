const FS = require("fs");
const Path = require("path");

//github.com/stephenhandley/requireindex/blob/master/index.js
module.exports = function(dir, basenames) {
    const requires = {};

    if (arguments.length === 2) {
        // if basenames argument is passed, explicitly include those files
        basenames.forEach(function(basename) {
            const filepath = Path.resolve(Path.join(dir, basename));
            requires[basename] = require(filepath);
        });
    } else if (arguments.length === 1) {
        // if basenames arguments isn't passed, require all javascript
        // files (except for those prefixed with _) and all directories

        const files = FS.readdirSync(dir);

        // sort files in lowercase alpha for linux
        files.sort(function(a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();

            if (a < b) {
                return -1;
            } else if (b < a) {
                return 1;
            } else {
                return 0;
            }
        });

        files.forEach(function(filename) {
            // ignore index.js and files prefixed with underscore and
            if (filename === "index.js" || filename[0] === "_" || filename[0] === ".") {
                return;
            }

            const filepath = Path.resolve(Path.join(dir, filename));
            const ext = Path.extname(filename);
            const stats = FS.statSync(filepath);

            // don't require non-javascript files (.txt .md etc.)
            const exts = [".js", ".node", ".json"];
            if (stats.isFile() && exts.indexOf(ext) === -1) {
                return;
            }

            const basename = Path.basename(filename, ext);

            requires[basename] = require(filepath);
        });
    } else {
        throw new Error("Must pass directory as first argument");
    }

    return requires;
};
