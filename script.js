function getGeoLocation() {
  var output = document.getElementById('start');

  if (!navigator.geoloction) {
    output.innerHTML = '<p>Your browser does not support geolocation</p>';
  }

  function success(pos) {
    // cache lat and long coords
    var latitude  = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
  }

  function error() {
    alert('Unable to determine your location');
  }

  output.innerHTML = 'Tracking...';
  output.className += ' loading';
  navigator.geolocation.getCurrentPosition(success, error);
}


// event handlers
document.getElementById('start').addEventListener('click', getGeoLocation);
