const router = require("express").Router();
const { Search, User } = require("../../models");
const withAuth = require("../../utils/auth");


//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// for delete /api/geodb/:id

