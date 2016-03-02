function getGeoLocation() {
  var output = document.getElementById('start');

  if (!navigator.geoloction) {
    output.innerHTML = 'Your browser does not support geolocation';
  }

  function success(position) {
    // cache lat and long coords
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    // IIFE that references coordinates for API call
    ( function getLocalWeather() {
      var URL = 'http://api.openweathermap.org/data/2.5/weather?lat=%lat%&lon=%long%&APPID=21f42111c89049ac9a71560c5fe1d747';
          URL = URL.replace('%lat%', latitude);
          URL = URL.replace('%long%', longitude);

      // TODO: ajax request for api JSON
    
    } )();

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
