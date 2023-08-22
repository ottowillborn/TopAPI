const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM sys.Users`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/* Get specific user based on their uuid */
async function getUser(page = 1, id){
    let queryString = `SELECT * FROM sys.Users WHERE uuid=${id}`
    console.log(queryString);
    const rows = await db.query(
        queryString
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

/* Add a new user with user data */
async function addUser(body){
    const result = await db.query(
        `INSERT INTO sys.Users
         VALUES (${body.uuid},'${body.name}','${body.dob.slice(0,10)}',${body.elo});`
    );
}

/* Delete a user by uuid */
async function deleteUser(uuid){
    console.log(uuid)
    let queryString = `DELETE FROM sys.Users WHERE (uuid = ${uuid});`
    const result = await db.query(
        queryString
    );
}
  

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser
}