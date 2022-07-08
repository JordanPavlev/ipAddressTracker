const secret_api ='at_qIuBqv8fScvDhcIgRZ8ZrhVvOg9Cd'
const bypass_cors_url ='http(s)://thingproxy.freeboard.io/fetch/'
const api_uri ='https://geo.ipify.org/api'
let current_verion ='v2'

let currentIp = document.getElementById('current_ip');
let currentTown = document.getElementById('current_town');
let currentZone = document.getElementById('current_zone');
let currentISP = document.getElementById('current_isp');
const enteredIP = document.getElementById('ip_address');
const searchBtn = document.getElementById('search_btn');

const headersOption = {
    headers: {
        'Acces-Control-Allow-Origin': '*',
        'dataType': 'json',
    }
}

const map = L.map('display_map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})


updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}`
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    fetch(ip_url, headersOption)
    .then( results => results.json())
    .then( data => {
        currentIp.innerHTML = data.ip
        currentTown.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        currentZone.innerHTML = data.location.timezone
        currentISP.innerHTML = data.isp 

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    if (enteredIP.value != '' && enteredIP.value != null) {
        getIPDetails(enteredIP.value)
        return
    }
    alert("Please enter a valid IP address");
})