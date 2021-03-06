const router = require("express").Router();
const axios = require("axios").default;
const { Search } = require("../../models");
const withAuth = require("../../utils/auth");
require('dotenv').config();

//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// this first post request will help us get a list of city names to dynamically create buttons in the dashboard after a search
router.post("/", withAuth, async (req, res) => {
  try {
    const cit = req.body.cityParam;

    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=US&namePrefix=${cit}`,
      headers: {
          //this api key is stored in the .env file
          //make sure to require("doenv").config() on top to make it work
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data)

        const citiesData = response.data.data;

        const cities = citiesData.map((city) => ({
          city: city.name,
          state: city.regionCode,
          id: city.wikiDataId,
        }));

        // console.log(cities);

        //sending it back to front end
        res.json(cities);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// for post /api/geodb/citydetails
// this one will create our instance of our Search model
router.post("/citydetails", withAuth, async (req, res) => {
  try {
    const cityId = req.body.id;
    console.log(cityId);

    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //this data should be the city data that we want to append to our page
        //since it is nested inside an object, need to do response.data.data
        const cityDetails = response.data.data;
        console.log(cityDetails);

        // look
        const postCityData = Search.create({
          ...cityDetails,
          user_id: req.session.user_id,
        });

        res.status(200).json(postCityData);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// for delete /api/geodb/:id
router.delete("/:id", async (req, res) => {
  try {
    const response = await Search.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
