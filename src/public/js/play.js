

httpGetAsync('http://69.4.155.132:45545/getaudiocount', function (v) {
    console.log(v)
    for (let i = 0; i < v; i++) {
        Array.from(document.getElementsByClassName('results_wrapper')).forEach(e => {
            e.innerHTML += `'<audio controls="" name="media">
                <source id="demo" type="audio/mpeg" src="http://69.4.155.132:45545/${i}.ogg">
                </audio> <br>`
        });

    }
})

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}