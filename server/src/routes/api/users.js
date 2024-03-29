// routes/api/users.js

const express = require("express");
const router = express.Router();
require("dotenv").config();
const userController = require("../../controllers/userController");
const riotController = require("../../controllers/riotController");

// Load User model
const User = require("../../models/User");

// Load Authentication function
const requireAuth = require("../../middleware/requireAuth");
// require Auth for all user routes

router.use(requireAuth);

// @route GET api/users/test
// @description tests users route
// @access Public
router.get("/test", (req, res) => res.send("user route testing!"));

// @route GET api/users/name
// @description use Riot API find summoner name of user
// @access Public
router.get("/name", async (req, res) => {
  const player_name = req.query.username;
  try {
    const name = await riotController.searchForPlayer(player_name);
    res.send(name);
  } catch (e) {
    res.sendStatus(500);
  }
});

// @route GET api/users/:id
// @description Get single User by id
// @access Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nouserfound: "No User found" }));
});

// @route GET api/users
// @description Get user data
// @access Public
router.get("/", userController.getUser);

// @route POST api/users
// @description add main
// @access Public
router.post("/main", userController.setMain);

// @route GET api/users
// @description add/save user
// @access Public
router.post("/", (req, res) => {
  User.create(req.body)
    .then((user) => res.json({ msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this user" }));
});

// @route GET api/users/:id
// @description Update user
// @access Public
router.put("/:username", userController.setPlayerData);

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete("/:id", async (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a user" }));
});

module.exports = router;
