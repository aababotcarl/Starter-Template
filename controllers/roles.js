const AccessControl = require('accesscontrol');
const acc = new AccessControl();

exports.roles = (function(){
    acc.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")

    acc.grant("pro")
        .extend("basic")
        .readAny("profile")

    acc.grant("admin")
        .extend("basic")
        .extend("pro")
        .updateAny("proifle")
        .deleteAny("profile")

    return acc;
})();