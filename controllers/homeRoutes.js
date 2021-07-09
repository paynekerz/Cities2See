//HOME ROUTES (all get requests)---------------------
const router = require('express').router();
const { User, Search } = require('../models'); 
const withAuth = require('../utils/auth'); 

//ALL THE GET REQUESTS

// home is /
router.get('/', authAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', '']],
        });

        const users = userData.map((project)) => project.get({ plain: true}));
    }


});

// dashboard is /dashboard -> when user is logged in

// geodb is /geodb -> our api

// sign in is /signin


// sign up is /signup

//logout is /logout




router.post()