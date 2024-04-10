var userMap = L.map('userMap').setView([3.8595361, 11.5003448], 8);
var T = L;
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">GaztrackMap</a>'
}).addTo(userMap);
var markerU = L.marker([3.8595361, 11.5003448]).addTo(userMap);

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
  var lat = (e.latlng.lat);
  var lng = (e.latlng.lng);
  var newLatLng = e.latlng;

  window.localStorage.setItem("lat", lat);
  window.localStorage.setItem("lng", lng);

  markerU.setLatLng(newLatLng); 

}


userMap.on('click', onMapClick);




