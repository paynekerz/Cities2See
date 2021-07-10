const router = require("express").Router();
const axios = require("axios").default;
const { Search, User } = require("../../models");
const withAuth = require("../../utils/auth");


//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
router.post("/geodb", withAuth, async (req, res) => {
    try{
       
        //through string/array methods, lowercase the submited search value and grab first three letters of city name
        //then send this in the body of dashboard.js through the post. 
        //This req.body will become what we put in  ${cit}

        const cit = req.body;
        
        const options = {
            method:"GET",
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
            params: {limit: "1", countryIds: "US", namePrefix: `${cit}` },
            headers: {'x-rapidapi-key': 'cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60',
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //this should give us something like Q60 which is the city id
            console.log(response.data.wikiDataId);

            const cityId = response.data.wikiDataId;
            const options = {
                method:"GET",
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
                headers: {'x-rapidapi-key': 'cfae163e6amshce157a4d53b70e4p11e7d3jsnbe82b2369e60',
                        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
               //this data should be the city data that we want to append to our page
                console.log(response.data);

                const cityData = response.data;

                const postCityData = await Search.create({
                    //check if cityData is array before using spread operator
                    ...cityData,
                    user_id: req.session.user_id,
                })

                res.status(200).json(postCityData);

            }).catch(function (error) {
                console.error(error);
            });
 

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