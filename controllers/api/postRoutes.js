const router = require("express").Router();
const axios = require("axios").default;
const { Search, User } = require("../../models");
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
            console.log(response.data)
        
            const citiesData = response.data.data;

            const cities = citiesData.map(city => ({city: city.name, state: city.regionCode}));

            console.log(cities);

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
// router.post("/citydetails", withAuth, async (req, res) => {
//     try {
//         const cityId = req.body;

//         const options = {
//             method:"GET",
//             url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
//             headers: {'x-rapidapi-key': 'cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60',
//                     'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
//             }
//         };

//         axios.request(options).then(function (response) {
//            //this data should be the city data that we want to append to our page
//             console.log(response.data);

//             const city_data = response.data;

//             const postCityData =  Search.create({
//                 //check if cityData is array before using spread operator
//                 ...city_data,
//                 user_id: req.session.user_id,
//             })

//             res.status(200).json(postCityData);

//         }).catch(function (error) {
//             console.error(error);
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


// for delete /api/geodb/:id


module.exports = router;