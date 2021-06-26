//Handles auth and such, should be in every html page.

console.log(firebase);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        // signed in
        
        //userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        location.href = "/"
    }
});

const loginFormHandler = async function (event) {
    event.preventDefault();
    auth.signInWithPopup(provider).then(user => {
        location.href = "/home"
    });
};
function signout() {
    console.log("Signing out via bottom menu button.");

    auth.signOut();
}

document.querySelector("#sign-out")?.addEventListener("click", signout);

document.querySelector("#signin-form")?.addEventListener("submit", loginFormHandler);


