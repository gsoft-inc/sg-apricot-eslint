//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("./utils/get-all-files.js");

// import all rules in lib/rules and all configs in lib/configs
module.exports.rules = requireIndex(__dirname + "/rules");
