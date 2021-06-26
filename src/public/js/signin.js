console.log(firebase);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        // signed in
        location.href = "/home"
        //userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        // whenSignedIn.hidden = true;
        // whenSignedOut.hidden = false;
        // userDetails.innerHTML = '';
    }
});

const loginFormHandler = async function (event) {
    event.preventDefault();
    auth.signInWithPopup(provider);
};

document
    .querySelector("#signin-form")
    .addEventListener("submit", loginFormHandler);
