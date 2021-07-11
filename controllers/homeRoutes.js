//HOME ROUTES (all get requests)---------------------
const router = require('express').Router();
const { User, Search } = require('../models'); 
const withAuth = require('../utils/auth'); 

//ALL THE GET REQUESTS

// home, where you login is simply /
router.get("/", async (req, res) => {
    try {

        if(req.session.logged_in) {
            res.redirect("/dashboard");
            return;
        }
        //Render login.handlebars
        res.render("login");
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// sign up is /signup
router.get("/signup", async (req, res) => {
    try{
        if(!req.session.logged_in) {
            //Render login.handlebars
            res.render("signup");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// dashboard is /dashboard -> when user is logged in
router.get("/dashboard", withAuth, async (req, res) => {
    try{
        // find the user based on their user_id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
        });

        const user = userData.get({ plain: true });

        //find all of the city data that was saved by the user
        // the data comes from the instance of Search
        const searchData = await Search.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ]
        });

        //create an array of all the city data
        const cities = searchData.map((city) => city.get({ plain: true }));

        // console.log(posts);

        res.render("dashboard", {
            ...user,
            //send cities data into dashboard.handlebars to fill our our cards with {{}}
            cities,
            logged_in: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//logout is /logout
router.get("/logout", (req, res) => {
    if(!req.session.logged_in) {
        //take them back to login page
        res.redirect("/");
    }
    res.render("login");
});


module.exports = router;