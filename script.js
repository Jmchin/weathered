function getGeoLocation() {
  var output = document.getElementById('start');

  if (!navigator.geoloction) {
    output.innerHTML = 'Your browser does not support geolocation';
  }

  function success(position) {
    // cache lat and long coords
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
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
