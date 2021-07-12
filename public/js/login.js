const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {"Content-Type": "application/JSON"},
        });

        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Could not create account. Please insert valid characters");
        }
    }
};

const login = async (event) => {
        event.preventDefault();
        //make sure consts are named like keys in model
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        if (username && password) {
            const response = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: ({"Content-Type": "application/json"}),
            });

            if(response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Invalid username or password");
            }
        };
};


document.querySelector("#signUpBtn").addEventListener("click", signup);
document.querySelector("#signInBtn").addEventListener("click", login);