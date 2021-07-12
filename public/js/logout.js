const logout = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-type": "application/json"},
    });
    
    if (response.ok) {
        document.location.replace("/");
    }
}
document.querySelector("#logoutBtn").addEventListener("click", logout);