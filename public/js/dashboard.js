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
            console.log(result);
        } else {
            alert('Invalid search');
        }
};



// const cityDataEventHandler = async (event) => {
//     event.preventDefault();

//     const cityButton = document.querySelector("#").getAttribute("id");

//     const response = await fetch("/api/geodb/citydetails", {
//         method: "POST",
//         body: JSON.stringify({  }),
//         headers: { "Content-Type": "application/json" },
//     });

//     if(response.ok) {
//         document.location.replace("/dashboard");
//     } else {
//         alert('City details are unavailable');
//     }

// }

document.querySelector(".searchACity").addEventListener("submit", searchEventHandler);


//the const name for what is being sent through the body is the same as the key in Search.js


//delete city card