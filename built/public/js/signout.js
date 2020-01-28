function signout() {
    fetch("/signout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            document.location.replace("/");
        })
        .catch(err => console.log(err));
}

document.querySelector("#sign-out").addEventListener("click", signout);
