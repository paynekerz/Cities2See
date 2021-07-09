//HOME ROUTES (all get requests)---------------------
const router = require('express').router();
const { User, Search } = require('../models'); 
const withAuth = require('../utils/auth'); 

<<<<<<< HEAD
router.get('/', withAuth, async (req, res) => {
=======
//ALL THE GET REQUESTS

// home is /
router.get('/', authAuth, async (req, res) => {
>>>>>>> 68b9ddae4817f98664f0b4f2d6cece37ab1153ea
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('/login', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

<<<<<<< HEAD
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
// home is /
// sign in is /signin
// sign up is /signup
=======

});

>>>>>>> 68b9ddae4817f98664f0b4f2d6cece37ab1153ea
// dashboard is /dashboard -> when user is logged in

// geodb is /geodb -> our api
<<<<<<< HEAD
//USER ROUTES (all post requests) ---------------------
// for post login  /api/users/login
// for post logout  /api/users/logout
// for post create new user /api
//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// for delete /api/geodb/:id
=======

// sign in is /signin


// sign up is /signup

//logout is /logout




router.post()
>>>>>>> 68b9ddae4817f98664f0b4f2d6cece37ab1153ea
