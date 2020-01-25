
const signupFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector("#username-input-signup");
    const emailEl = document.querySelector("#email-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    fetch("/user", {
        method: "post",
        body: JSON.stringify({
            username: usernameEl.value,
            emailEl: emailEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);