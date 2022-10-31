let tempUnit = 'C',
  tempF = 0,
  tempC = 0;

function getWeather(apiUrl, mylatitude, mylongitude) {
  let apiRequest = apiUrl + mylatitude + "&" + mylongitude;
  fetch(apiRequest)
    .then(response => response.json())    // a fetch le llega una respuesta en string que tiene que ser parseada a JSON
    .then(data => {
      console.log(data)
      //city
      $("#city").text(data.name + ", " + data.sys.country);
      //type Weather
      let typeWeather = data.weather[0].main;
      $("#typeWeather").text(typeWeather);
      //icon Weather
      let srcIcon = getIconWeather(typeWeather);
      $("#icon-weather").attr("src", srcIcon);
      //temp
      let tempCel = Math.round(data.main.temp);
      tempC = tempCel + "°C";
      tempF = Math.round(tempCel * (9 / 5) + 32) + '°F';
      let tempOut = (tempUnit === 'C') ? tempC : tempF;
      $("#heading").text(tempOut);
      //wind      
      $("#wind").text(data.wind.speed + " km/h");
      //humidity
      $("#humidity").text(data.main.humidity + " %");
      $("#p-clouds").text(data.clouds.all + " %");
      //time
      let date = new Date();
      let usDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      $("#time-local").text(usDate);
    })
    .catch(error => console.error(error));
};

function getIconWeather(descWeather) {
  let typeWeather = descWeather.toLowerCase();
  let ruta = '';
  switch (typeWeather) {
    case 'clear':
      ruta = "https://img.icons8.com/color/96/000000/summer--v2.png";
      break;
    case 'clouds':
      ruta = "https://img.icons8.com/color/96/000000/cloud-lighting--v2.png";
      break;
    case 'drizzle':
      ruta = "https://img.icons8.com/color/96/000000/rain--v2.png";
      break;
    case 'rain':
      ruta = "https://img.icons8.com/ultraviolet/80/000000/rain.png";
      break;
    case 'snow':
      ruta = "https://img.icons8.com/fluency/96/000000/winter.png";
      break;
    case 'thundrstom':
      ruta = "https://img.icons8.com/office/80/000000/cloud-lighting--v1.png";
      break;
    default:
      ruta = ""
  }
  return ruta;
}

$(document).ready(function() {
  x = document.getElementById("msg-error");
  x.style.visibility = "hidden";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let mylatitude = "lat=" + position.coords.latitude;
      let mylongitude = "lon=" + position.coords.longitude;
      document.getElementById("lat").innerHTML = mylatitude;
      document.getElementById("lon").innerHTML = mylongitude;
      let apiUrl = " https://weather-proxy.freecodecamp.rocks/api/current?";
      getWeather(apiUrl, mylatitude, mylongitude);
    });
  }
  else {
    x.style.visibility = "visible";
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

  $("#btn-convert").on("click", function() {
    if (tempUnit === "C") {
      tempUnit = "F";
      $("#heading").text(tempF);
      $("#btn-convert").text("Convert C Temp");
    } else {
      tempUnit = "C";
      $("#heading").text(tempC);
      $("#btn-convert").text("Convert F Temp");
    }
  });



});

