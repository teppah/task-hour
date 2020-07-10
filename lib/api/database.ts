import faunadb from "faunadb";

const serverClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

console.log(`initialized FaunaDB client`);
export default serverClient;
