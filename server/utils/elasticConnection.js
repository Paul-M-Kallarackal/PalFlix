const elastic = require("@elastic/elasticsearch");
const eclient= new elastic.Client({ node: "http://localhost:9200" });
module.exports = eclient;