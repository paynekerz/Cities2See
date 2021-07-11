const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

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
}

// const redirectSignin = async (event) => {
//     event.preventDefault();

//     document.location.replace("/");
// }

document.querySelector("#signUpBtn").addEventListener("click", signup);
document.querySelector("#signUpBtn").addEventListener("click", signup);

// document.querySelector("#signInBtn").addEventListener("click", redirectSignin);