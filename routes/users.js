const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getUsers(req.query.page));
    console.log("GET of users successful")
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user by ID */
router.get('/:uuid', async function(req, res, next) {
    try {
      res.json(await users.getUser(req.query.page, req.params.uuid));
      console.log(`GET of user ${req.params.uuid} successful`)
    } catch (err) {
      console.error(`Error while getting users `, err.message);
      next(err);
    }
  });

/* POST new user */
router.post('/', async function(req, res, next) {
    try {
        res.json(await users.addUser(req.body));
        console.log("POST of new user successful")
      } catch (err) {
        console.error(`Error while setting users `, err.message);
        next(err);
      }
  });

  /* DELETE user by uuid */
  router.delete('/:uuid', async function(req, res, next) {
    try {
        res.json(await users.deleteUser(req.params.uuid));
        console.log("DELETE of user successful")
      } catch (err) {
        console.error(`Error while deleting user `, err.message);
        next(err);
      }
  });

module.exports = router;
