const login = async (event) => {
        event.preventDefault();
        //make sure consts are named like keys in model
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#loginPassword").value.trim();

        if (username && password) {
            const response = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: ({"Content-Type": "application/json"}),
            });

            if(response.ok) {
                document.location.replace("/dashboard");
            } 
        };
}

const redirectSignup = async (event) => {
    event.preventDefault();

    document.location.replace("/signup");
}

document.querySelector("#signInBtn").addEventListener("click", login);
document.querySelector("#signUpBtn").addEventListener("click", redirectSignup);