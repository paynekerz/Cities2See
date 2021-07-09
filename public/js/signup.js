const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#").value.trim();
    const password = document.querySelector("#").value.trim();

    if (username && password) {
        const result = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/JSON"},
        });

        if (result.ok) {
            document.location.replace("")
        }
    }
}
document.querySelector("").addEventListener("click", signup)