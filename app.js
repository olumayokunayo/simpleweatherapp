let cityLabel = document.getElementById("city-name");
let temperatureCLabel = document.getElementById("temperatureC");
let temperatureFLabel = document.getElementById("temperatureF");
let descriptionLabel = document.getElementById("description");
let humidityLabel = document.getElementById("humidity");
let pressureLabel = document.getElementById("pressure");
let windLabel = document.getElementById("wind-speed");
let visibilityLabel = document.getElementById("visibility");
let datelabel = document.getElementById("date");
let timeLabel = document.getElementById("time");
let countryLabel = document.querySelector(".country");


let lat;
let lon;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
    //   lat = 37.0902;
    //   lon = 95.7129;
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      // console.log(lat, lon);
      const apiKey = `38f4e512cefb9217610c7b45bf199f94`;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetch(base).then(async (res) => {
        // console.log(res);
        const data = await res.json();
        console.log(data);
        const location = data.sys.country;
        const weatherCon = data.weather[0].description;
        const weatherIcon = data.weather[0].icon
        const currentTempCelcius = data.main.temp;
        const currentTempFahrenheit = ((currentTempCelcius * 9/5) + 32).toFixed(2)
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const humidity = data.main.humidity;


        cityLabel.textContent = `${data.name}`
        // temperature.textContent = `${data.main.temp}`
        temperatureCLabel.textContent = `${currentTempCelcius}'°C`
        temperatureFLabel.textContent = `${currentTempFahrenheit}°F`
        descriptionLabel.textContent = `${data.weather[0].description}`
        countryLabel.textContent = `${location}`
        humidityLabel.textContent = `${humidity} %`
        pressureLabel.textContent = `${pressure} hPa`
        windLabel.textContent = `${windSpeed} m/s`
        visibilityLabel.textContent = `${data.visibility} m`
      });
      //   .then((res)=> {
      //     console.log(res);
      //     return res.json()
      //     .then((data)=>{
      //         console.log(data);
      //     })
      //   })
    },
    function () {
      alert("Could not get your position");
    }
  );
}

let session = "am"
const getTime = function(){
setInterval(() => {
    let newD = new Date();
    let hours = newD.getHours();
    let minutes = newD.getMinutes();
    let date = new Date().toString().split(' ');
    let newDate = `${date[0]}, ${date[1]} ${date[2]}, ${date[3]}`
    let time = `${hours}:${minutes} ${session}`
  
    if(hours < 12) {
       session = "am"
    } else {
       session = "pm"
    }

    hours = hours < 12 ? "0" + hours : hours;
    minutes = minutes < 12 ? "0" + minutes : minutes;

    datelabel.textContent = `${newDate}`
    timeLabel.textContent = `${time}`
  }, 100);

}
getTime()