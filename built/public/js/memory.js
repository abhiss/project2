const newMemory = async function (event) {
    event.preventDefault();
    console.log('test')

    const textMemory = document.querySelector('#memory-input');

    const token = localStorage.getItem("token");
    await fetch(`/post`, {
        method: "POST",
        body: JSON.stringify({
            body: textMemory.value,
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    }).then(function () {
        document.location.replace("/home")
    });
};

document
    .querySelector("#ins-save")
    .addEventListener("submit", newMemory);
