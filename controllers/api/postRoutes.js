const router = require("express").Router();
const axios = require("axios").default;
const { Search, User } = require("../../models");
const withAuth = require("../../utils/auth");


//GEODB ROUTES (post, delete) --------------------------
// for post /api/geodb
router.post("/geodb", withAuth, async (req, res) => {
    try{
        //need to get city name from search
            //find something from Search model which grabs what was sent from dashboard.js
            //through js, lowercase submited search and grab first three letters of city name = ${cit}

        if(/*data from model is there*/ ) {
            const options = {
                method:"GET",
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
                params: {limit: "1", countryIds: "USA", namePrefix: `${cit}` },
                headers: {'x-rapidapi-key': 'c57ab5b39amsh02624b821726540p192f21jsnc14789484964',
                        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                }
            };
    
            axios.request(options).then(function (response) {
                console.log(response.data.wikiDataId);
                const cityId = response.data.wikiDataId;
                const options = {
                    method:"GET",
                    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
                    headers: {'x-rapidapi-key': 'c57ab5b39amsh02624b821726540p192f21jsnc14789484964',
                            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                    }
                };
        
                axios.request(options).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.error(error);
                });

            }).catch(function (error) {
                console.error(error);
            });

    
        }



    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// for delete /api/geodb/:id

