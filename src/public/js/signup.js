
const signupFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector("#username-input-signup");
    const emailEl = document.querySelector("#email-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");

    if (emailEl.value.length < 3) {
        return;
    } else if (passwordEl.value.length < 3) {
        return;
    }
    fetch("/user", {
        method: "post",
        body: JSON.stringify({
            username: usernameEl.value,
            email: emailEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function (value) {
            if (value.status = 200) {
                document.location.replace("/");
            }

        })
        .catch(err => console.log(err));
};

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
