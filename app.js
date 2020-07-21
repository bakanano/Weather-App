window.addEventListener("load", () => {
    
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(position => {
        processData(position.coords.latitude, position.coords.longitude);
        
        });
    }
    else {
        alert("Your browser does not support geolocation services");
    }

});

function processData(lat, long) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    /**template literals need to be encolosed in backticks**/
    const api = `${proxy}https://api.darksky.net/forecast/${config.key}/${lat},${long}`;

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            parseData(data);
        });
}

function parseData(data) {
    const temperatureDegrees = document.querySelector("#temperatureInDegrees");
    const tempDescription = document.querySelector("#temperatureDescription");
    const usersRegion = document.querySelector("#userLocation");
    //icon is the icon text
    const {icon, summary, temperature} = data.currently;
     tempDescription.textContent = summary;
     temperatureDegrees.textContent = Math.round((temperature - 32) * (5 / 9), 2);
     usersRegion.textContent = data.timezone;
     
     setIcon(icon, document.querySelector("#icon"));
}

function setIcon(iconText, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = iconText.replace(/-/g, "_").toUpperCase();
    skycons.play();
    //set the icon
    return skycons.set(iconID, Skycons[currentIcon]);
}
