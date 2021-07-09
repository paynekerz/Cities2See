const login = async (event) => {
        event.preventDefault();
        const username = document.querySelector("#").value.trim();
        const password = document.querySelector("#").value.trim();

        if (username && password) {
            const response = await fetch("", {
                method: "POST",
                body: JSON.stringify(username, password),
                headers: ({"content-Type": "application/json"}),
            });

            if(response.ok) {
                document.location.replace("");
            } 
        };
    }
};