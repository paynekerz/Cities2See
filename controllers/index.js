const router = require('express').Router();

<<<<<<< HEAD
const homeRoutes = require('./homeRoutes');

<<<<<<< HEAD
router.use('/', homeRoutes);

module.exports = router;
=======
//USER ROUTES (all post requests) ---------------------
// for post login  /api/users/login
// for post logout  /api/users/logout
// for post create new user /api
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  
//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// for delete /api/geodb/:id

=======
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
>>>>>>> 68b9ddae4817f98664f0b4f2d6cece37ab1153ea

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;

<<<<<<< HEAD
>>>>>>> 05186d05a0d98b5c3b4b0097d13511f1b2f44225
=======

>>>>>>> 68b9ddae4817f98664f0b4f2d6cece37ab1153ea
