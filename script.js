function getGeoLocation() {
  var output = document.getElementById('start');

  if (!navigator.geolocation) {
    output.innerHTML = 'Your browser does not support geolocation';
  }

  function success(position) {
    // cache coordinates
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // IIFE that references coordinates for API call
    (function getLocalWeather() {
      var httpRequest;

      // openweathermap API settings
      var URL = 'http://api.openweathermap.org/data/2.5/weather?lat=%lat%&lon=%long%&APPID={APIKEY}';
      var API_KEY = '21f42111c89049ac9a71560c5fe1d747';

      URL = URL.replace('{APIKEY}', API_KEY);
      URL = URL.replace('%lat%', latitude);
      URL = URL.replace('%long%', longitude);

      // API request
      (function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
          alert('Cannot create XMLHTTP instance');
          return false;
        }

        httpRequest.onload = alertContents;
        httpRequest.open('GET', URL);
        httpRequest.send();
      })();

      function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
          } else {
            alert('There was a problem with the request.');
            console.log('Error: ', httpRequest.status);
          }
        }
      }

    })();

  }

  function error() {
    output.style['background-color'] = '#f75e5e';
    output.innerHTML = 'Unable to determine your location';

  }

  output.innerHTML = 'Tracking...';
  navigator.geolocation.getCurrentPosition(success, error);
}


// event handlers
document.getElementById('start').addEventListener('click', getGeoLocation);
