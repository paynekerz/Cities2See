const router = require("express").Router();
const axios = require("axios").default;
const { Search } = require("../../models");
const withAuth = require("../../utils/auth");


//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
// this first post request will help us get a list of city names to dynamically create buttons in the dashboard after a search
router.post("/", async (req, res) => {
    //removed the withAuth for now!
    try{
        const cit = req.body.cityParam;
        
        const options = {
            method:"GET",
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&namePrefix=${cit}`,
            headers: {'x-rapidapi-key': 'cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60',
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data)
        
            const citiesData = response.data.data;

            const cities = citiesData.map(city => ({city: city.name, state: city.regionCode, id: city.wikiDataId}));

            // console.log(cities);

            res.json(cities);


        }).catch(function (error) {
            console.error(error);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// for post /api/geodb/citydetails
// this one will create our instance of our Search model
router.post("/citydetails", async (req, res) => {
    //removed the withAuth for now!
    try {
        const cityId = req.body.id;
        console.log(cityId);

        const options = {
            method:"GET",
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
            headers: {'x-rapidapi-key': 'cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60',
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
           //this data should be the city data that we want to append to our page
            console.log("This is our response which is like req.body ");

            const cityDetails = response.data.data;
            console.log(cityDetails);

            // const city = {city : response.data.data.city};
            // const region = {region : response.data.data.region};
            // const population = {population : response.data.data.population};
            // const elevationMeters = {elevationMeters : response.data.data.elevationMeters};
            // const timezone = {timezone : response.data.data.timezone};
            // const latitude = {latitude : response.data.data.latitude};
            // const longitude = {longitude : response.data.data.longitude};

            const city = response.data.data.city;
            const region = response.data.data.region;
            const population = response.data.data.population;
            const  elevationMeters = response.data.data.elevationMeters;
            const timezone = response.data.data.timezone;
            const latitude = response.data.data.latitude;
            const longitude = response.data.data.longitude;


            const postCityData =  Search.create({
                // ...city,
                // ...region,
                // ...population,
                // ...elevationMeters,
                // ...timezone,
                // ...latitude,
                // ...longitude,
                ...cityDetails,
                user_id: req.session.user_id,
            });

            res.status(200).json(postCityData);

        }).catch(function (error) {
            console.error(error);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// for delete /api/geodb/:id


module.exports = router;