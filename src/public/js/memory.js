const newMemory = async function (event) {
    event.preventDefault();
    console.log('test')

    const textMemory = document.getElementById('#memory-input');

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
    })
    document.location.replace("/home")

};

document
    .getElementById("#ins_save")
    .addEventListener("click", newMemory);
