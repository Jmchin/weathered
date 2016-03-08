(function app() {
  document.getElementById('start').addEventListener('click', getGeoLocation);

  function getGeoLocation() {
    var startButton = document.getElementById('start');
    var weatherCard = document.getElementById('weather-card');
    var results;

    if (!navigator.geolocation) {
      startButton.innerHTML = 'Your browser does not support geolocation';
    }

    function success(position) {
      startButton.style['background-color'] = '#44c376';
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

          httpRequest.onload = getResults;
          httpRequest.open('GET', URL, true);
          httpRequest.send();
        })();

        // TODO: modify function to format JSON results
        function getResults() {
          results = JSON.parse(httpRequest.responseText);

          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              populateWeatherCard();
            } else {
              alert('There was a problem with the request.');
              console.log('Error: ', httpRequest.status);
            }
          }
          return results;
        }

        function populateWeatherCard() {
          // css class management
          startButton.classList.add('hidden');
          weatherCard.classList.remove('hidden');
          weatherCard.classList.add('fadein');

          // card subsection declarations
          var cityName = document.getElementById('city-name');
          var cityTemp = document.getElementById('city-temp');
          var tempSlider = document.getElementById('temp-slider');

          // card subsection definitions
          cityName.innerHTML = results.name;
          cityTemp.innerHTML = results.main.temp;
          getWeatherIcon();
        }

        function getWeatherIcon(desc) {
          var weatherIcon = document.getElementById('weather-icon');
          switch (desc) {
            case 'Clear':
              weatherIcon.classList.add('sun');
              break;
            default:
              weatherIcon.classList.add('sun');
          }
        }

      })();

    }

    function error() {
      startButton.style['background-color'] = '#f75e5e';
      startButton.innerHTML = 'Unable to determine your location';

    }

    startButton.innerHTML = 'Tracking...';
    navigator.geolocation.getCurrentPosition(success, error);
  }

})();
