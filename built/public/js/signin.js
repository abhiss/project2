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
        .then(function (res) {
            if (res.status == 404) {
                alert('No account matching this email found')
            }
            else if (res.status == 200) { // everything ok
                document.location.replace("/home");
            }
            else if (res.status == 500){
                alert('Password is incorrect')
            }
            else {
                console.log('unexpected status code from user.ts in signin.js')
            }
        })
        .catch(err => console.log(err));
};

document
    .querySelector("#signin-form")
    .addEventListener("submit", loginFormHandler);
