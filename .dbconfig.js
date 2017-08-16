const user = "assessmentsadmin";
const pass = "ThugnificentLike";
const host = "localhost";
const port = 27017;
const dbname = "assessments";

module.exports = `mongodb://${user}:${pass}@${host}:${port}/${dbname}`;

/*

use assessments;
db.createUser( { user: "assessmentsadmin",
                 pwd: "ThugnificentLike",
                 roles: ["readWrite"] } )


*/
