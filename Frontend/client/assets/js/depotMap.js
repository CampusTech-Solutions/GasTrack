var depotListMap = L.map('depotMap').setView([3.8595361, 11.5003448], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">GaztrackMap</a>'
}).addTo(depotListMap);
var depotMarker = L.marker([3.8595361, 11.5003448]).addTo(depotListMap);

function onMapDepotClick(e) {
  alert("You clicked the map at " + e.latlng);
  var lat = (e.latlng.lat);
  var lng = (e.latlng.lng);
  var newLatLng = new L.LatLng(lat, lng);

  window.localStorage.setItem("depot_lat", lat);
  window.localStorage.setItem("depot_lng", lng);

  depotMarker.setLatLng(newLatLng); 
}



depotListMap.on('click', onMapDepotClick);



