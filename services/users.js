const db = require('./db');
const helper = require('../helper');
const config = require('../config');

class validationError extends Error {
    constructor(message) {
      super("Error: " + message);
      this.name = "ValidationError";
    }
  }

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
         VALUES (${body.uuid},'${body.name}','${body.dob.slice(0,10)}','${body.elo}','${body.location}','${body.bio}');`
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

/* Get all matches data for specific userID */
async function getMatches(page = 1, id){
    const offset = helper.getOffset(page, config.listPerPage);
    let queryString = `SELECT * FROM sys.Matches WHERE (userID = ${id});`
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
  
  /* Add new match data, validate that it is not already in table*/
  async function addMatch(body){
    const result = await db.query(
        `INSERT INTO sys.Matches (id, matchedUserID, userID)
        SELECT NULL, ${body.matchedUserID}, ${body.userID}
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1
            FROM sys.Matches
            WHERE matchedUserID = ${body.matchedUserID} AND userID = ${body.userID}
        );`
    );
    if (result.affectedRows > 0) {
        console.log("POST of new match successful");
    } else {
        throw new validationError("Duplicate match being added");
    }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  getMatches,
  addMatch
}