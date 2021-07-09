//HOME ROUTES (all get requests)---------------------
const router = require('express').router();

const { User } = require('../models'); 

const withAuth = require('../utils/auth'); 

router.get('/', authAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', '']],
        });

        const users = userData.map((project)) => project.get({ plain: true}));
    }


})
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

router.post()