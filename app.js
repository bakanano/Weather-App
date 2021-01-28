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

/**
 * 
 * This function uses a proxy to bypass DarkSky blocking access via localhost, fetches user's
 * geolocation coordinates (passed in as arguments) and returns the data as a JSON object. After
 * the data has been read via response.json(), it is passed to the parseData(data) function for manipulation
 * of the DarkSky API.
 * 
 **/
function processData(lat, long) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/${config.key}/${lat},${long}`;

    fetch(api)
        .then(response => {
            response.json();
        })
        .then(data => {
            parseData(data);
        });
}

/**
 * 
 * 
 * This function fetches the required data to display the user's location and current weather at their location.
 * 
 **/
function parseData(data) {
    const temperatureDegrees = document.querySelector("#temperatureInDegrees");
    const tempDescription = document.querySelector("#temperatureDescription");
    const usersRegion = document.querySelector("#userLocation");
    const {icon, summary, temperature} = data.currently;
     tempDescription.textContent = summary;
     temperatureDegrees.textContent = Math.round((temperature - 32) * (5 / 9), 2);
     usersRegion.textContent = data.timezone;
     
     setIcon(icon, document.querySelector("#icon"));
}

/**
 * 
 * 
 * This function sets the icons to show on the page.
 * 
 **/

function setIcon(iconText, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = iconText.replace(/-/g, "_").toUpperCase();
    skycons.play();
    //set the icon
    return skycons.set(iconID, Skycons[currentIcon]);
}
