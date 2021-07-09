const login = async (event) => {
        event.preventDefault();
        //make sure consts are named like keys in model
        const username = document.querySelector("#").value.trim();
        const password = document.querySelector("#").value.trim();

        if (username && password) {
            const response = await fetch("/api/userRoutes", {
                method: "POST",
                body: JSON.stringify(username, password),
                headers: ({"content-Type": "application/json"}),
            });

            if(response.ok) {
                document.location.replace("");
            } 
        };
}

document.querySelector("").addEventListener("click", login);