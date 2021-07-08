const router = require('express').Router();

//HOME ROUTES (all get requests)---------------------
// home is /
// sign in is /signin
// sign up is /signup
// dashboard is /dashboard -> when user is logged in
// geodb is /geodb -> our api

//USER ROUTES (all post requests) ---------------------
// for post login  /api/users/login
// for post logout  /api/users/logout
// for post create new user /api


//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// for delete /api/geodb/:id




module.exports = router;
