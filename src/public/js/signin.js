const loginFormHandler = async function (event) {
    event.preventDefault();

    const emailEl = document.querySelector("#username-input-signin");
    const passwordEl = document.querySelector("#password-input-signin");
    fetch("/signin", {
        method: "post",
        body: JSON.stringify({
            email: emailEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            document.location.replace("/home");
        })
        .catch(err => console.log(err));
};

document
    .querySelector("#signin-form")
    .addEventListener("submit", loginFormHandler);
