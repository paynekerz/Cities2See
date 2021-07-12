const router = require("express").Router();
const axios = require("axios").default;
const { Search } = require("../../models");
const withAuth = require("../../utils/auth");

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
        "x-rapidapi-key": "cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60",
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
        "x-rapidapi-key": "cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //this data should be the city data that we want to append to our page
        console.log("This is our response which is like req.body ");

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
    res.status(200)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
