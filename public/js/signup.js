const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    if (username && password) {
        const result = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {"Content-Type": "application/JSON"},
        });

        if (result.ok) {
            document.location.replace("/dashboard")
        }
    }
}
document.querySelector("#signUpBtn").addEventListener("click", signup)