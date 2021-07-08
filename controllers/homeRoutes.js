//HOME ROUTES (all get requests)---------------------
const router = require('express').router();

const { User } = require('../models'); 

const withAuth = require('../utils/auth'); 

router.get('/', withAuth, async (req, res) => {
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
// dashboard is /dashboard -> when user is logged in
// geodb is /geodb -> our api
//USER ROUTES (all post requests) ---------------------
// for post login  /api/users/login
// for post logout  /api/users/logout
// for post create new user /api
//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// for delete /api/geodb/:id
