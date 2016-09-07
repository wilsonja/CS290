/* portions of the code are borrowed from the CS290 AJAX Interactions lecture */
var apiKey = "...enter API key here...";

document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById('citySubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var city = document.getElementById('userCity').value;
    var state = document.getElementById('userState').value;

    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + apiKey + "&units=imperial", true);
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        console.log(JSON.parse(req.responseText));
        var response = JSON.parse(req.responseText);
        document.getElementById('curCity').textContent = response.name;
        document.getElementById('curTemp').textContent = response.main.temp;
        document.getElementById('curHumidity').textContent = response.main.humidity;
        document.getElementById('description').textContent = response.weather[0].description;
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    })
    req.send(null)
    event.preventDefault();
  });

  document.getElementById('zipSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var zip = document.getElementById('userZip').value;

    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=" + apiKey + "&units=imperial", true);
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        console.log(JSON.parse(req.responseText));
        var response = JSON.parse(req.responseText);
        document.getElementById('curCity').textContent = response.name;
        document.getElementById('curTemp').textContent = response.main.temp;
        document.getElementById('curHumidity').textContent = response.main.humidity;
        document.getElementById('description').textContent = response.weather[0].description;
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    })
    req.send(null)
    event.preventDefault();
  })
}
