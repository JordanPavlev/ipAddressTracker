var ipDisplay = document.getElementById("current_ip");
var locationDisplay = document.getElementById("current_town");
var timezoneDisplay = document.getElementById("current_zone");
var ispDisplay = document.getElementById("current_isp");
var mapDisplay = document.getElementById("display_map");

var mymap = L.map('display_map').setView([34.0614, -118.08162], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2V2ZXRpaDg2MSIsImEiOiJja2h4MzFxaG8wOW5pMzBsdGZ1NXFoeHh5In0.hw5mLyF4KWalDgcxAWrmuw'
}).addTo(mymap);
var marker = L.marker([34.0614, -118.08162]).addTo(mymap);


function main(ipAddress){
  var ip = ipAddress;
  var api_key = 'at_qIuBqv8fScvDhcIgRZ8ZrhVvOg9Cd';
  var api_url = 'https://geo.ipify.org/api/v1?';
  var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

  
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => {
      findInfo(res);
      renderMap(res);
    })
}

function findInfo(res){
  console.log(res);
  ipDisplay.innerText = res.ip;
  locationDisplay.innerText = res.location.region + ", " + res.location.country + " ";
  timezoneDisplay.innerText = "UTC " + res.location.timezone;
  ispDisplay.innerText = res.isp;  
}

function renderMap(res){
  mymap.setView([res.location.lat, res.location.lng], 13);
  marker.setLatLng([res.location.lat, res.location.lng])
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  var userInput = e.target[0].value;
  // add an ip validation here
  main(userInput);
})