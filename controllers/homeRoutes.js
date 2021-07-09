//HOME ROUTES (all get requests)---------------------
const router = require('express').router();

const { User, Search } = require('../models'); 

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
  

// home is /
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('/dashboard', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// sign in is /login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// sign up is /signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('/signup');
});


// dashboard is /dashboard -> when user is logged in
router.get('/dashboard', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('/dashboard');
});

// geodb is /geodb -> our api
router.get('/geodb', (req, res) => try {
  const userData = await Search.findAll({
    order: [['name', 'ASC']],
  });

  const  = userData.map((project) => project.get({ plain: true }));

  res.render('/geodb');
});


module.exports = router;