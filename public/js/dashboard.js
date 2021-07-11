//to handle searchbar query and get data from API

const searchEventHandler = async (event) => {
    event.preventDefault();

    const cityName = document.querySelector("#searchbar").value.trim();
    cityParam = cityName.toLowerCase().substring(0,3);
    console.log(cityParam);

    const response= await fetch("/api/geodb", {
        method: "POST",
        body: JSON.stringify({ cityParam }),
        headers: { "Content-Type": "application/json" },
        });

        if(response.ok) {
            console.log("we got the first API post");
            const result = await response.json();
            // console.log(result);

            //convert object into an array
            const cities = Object.values(result);
            console.log(cities); //shows an array of objects with key of city and value of id

            const citiesBtnDiv = document.querySelector(".cityOptions");

            for(let index = 0; index < cities.length; index++) {
                const cityName = cities[index].city;
                const cityState = cities[index].state;
                const cityId = cities[index].id;
                
                const button= document.createElement("button");
                button.setAttribute("data-id", cityId);
                button.setAttribute("type", "submit");
                button.setAttribute("id","cityBtn");
                button.textContent= `${cityName}, ${cityState}`;

                citiesBtnDiv.append(button);
              
            }
        } else {
            alert('Invalid search');
        }
};



const cityDataEventHandler = async (event) => {
    event.preventDefault();
    
    const id = event.target.getAttribute("data-id");
    console.log("I am being clicked " + id);


    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch("/api/geodb/citydetails", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
        });

        if(response.ok) {
            console.log("Sending the id for params");
            
            document.location.replace("/dashboard");
        } else {
            alert('City details are unavailable');
        }

    };



}

document.querySelector(".searchACity").addEventListener("submit", searchEventHandler);
document.querySelector(".cityOptions").addEventListener("click", cityDataEventHandler);


//the const name for what is being sent through the body is the same as the key in Search.js


//delete city card