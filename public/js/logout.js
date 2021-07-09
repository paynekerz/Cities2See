const logout = async (event) => {
    event.preventDefault();
    const result = await fetch("/api/userRoutes", {
        method: "POST",
        headers: { "Content-type": "application/json"},
    });
    
    if (result.ok) {
        document.location.replace("/");
    }
}
document.querySelector("").addEventListener("click", logout)