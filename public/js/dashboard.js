//to handle searchbar query
//the const name for what is being sent through the body is the same as the key in Search.js
const searchEventHandler = async (event) => {
    event.preventDefault();

    const searchCity = document.querySelector("#searchbar").value.trim();
    cityParam = searchCity.toLowerCase().substring(0,3);
    console.log(cityParam);

    const response= await fetch("", {
        method: "POST",
        body: JSON.stringify({ cityParam }),
        headers: { "Content-Type": "application/json" },
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Invalid search');
        }
};


document.querySelector(".searchACity").addEventListener("submit", searchEventHandler);



//delete city card