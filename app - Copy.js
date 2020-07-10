window.addEventListener("load", ()=> {
	let longitude;
	let latitude;
	let temperatureDegree = document.querySelector(".degree");
	let temperatureDescription = document.querySelector(".temperatureDescription");
	let location = document.querySelector(".locationRegion");
	let temperatureSection = document.querySelector(".temperatureSection");
	/** navigator object consists of information about the browser **/
	/**geolocation gets the position of the user*/
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			/**darksky blocks CORS so we have to use a proxy via template literals**/
			const proxy = "https://cors-anywhere.herokuapp.com/";
			/**template literals need to be encolosed in backticks**/
			/** code 400 error due to longtitude and latitude incorrect order*	 */
			const api = `${proxy}https://api.darksky.net/forecast/0a46a14a3df72634789efd6e696c9b07/${latitude},${longitude}`;
	

			/**fetches the resources from api */
			fetch(api)
				.then(response => {
					/**parses the data from URL in readable JSON form **/
					return response.json();
				})
				.then (response => {
					console.log(response);
					/** this annotation is a fancy and short way of saying "response.temperature.currently" **/
					const {temperature, summary, icon} = response.currently;
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationRegion.textContent = response.timezone;
					/**`icon` is from the data */
					setIcon(icon, document.querySelector(".icon"));
					convertTemperature(temperature);
				});
		});
			}

			function setIcon(icon, iconID) {
				const skycons = new Skycons({color: "white"});
				const currentIcon = icon.replace(/-/g, "_").toUpperCase();
				skycons.play();
				return skycons.set(iconID,Skycons[currentIcon]);
			}

			function convertTemperature(temperature) {
				document.getElementById("#temperatureDegree").innerHTML = Math.floor((temperature-32) / (5/9));
			}
		});