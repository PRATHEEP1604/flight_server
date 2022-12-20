mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGhlZXAxNjE2IiwiYSI6ImNsYThjb2ZyNzAyOTUzcXFkbHM3amVwY2wifQ.qRhoxfXkAlxOnW4_uG-NBQ';
navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});
let long;
let lat;
let finalDes;
let sourcedes;
let srcdes =[];
let passengers;
let saved = JSON.parse(localStorage.getItem('key'));
if(Array.isArray(saved))
{
    passengers = saved;
}
else{
passengers =[
    {
        name: 'null',
        source: [],
        destination: null,
        time: null,
        phone: null
    }
]
}
console.log(passengers)
function successLocation(Position)
{
    console.log(Position);
    console.log(Position.coords.latitude);
    console.log(Position.coords.longitude);
    srcdes=[Position.coords.latitude,Position.coords.longitude];
    addmap([Position.coords.longitude,Position.coords.latitude])
}
function errorLocation()
{

}
function addmap(pos)
{
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: pos, // starting position [lng, lat]
    zoom: 1, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});
 const marker = new mapboxgl.Marker()
.setLngLat(pos)
.addTo(map);

let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'country,region,place,postcode,locality,neighborhood',
    mapboxgl: mapboxgl
    });
    let descoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'country,region,place,postcode,locality,neighborhood',
        mapboxgl: mapboxgl
        });

    // Get the geocoder results container.
    const results = document.getElementById('result');
     
    // Add geocoder result to container.
    geocoder.on('result', (e) => {
    let details = e.result;
    sourcedes = details.place_name;
    console.log(sourcedes);
    });
    document.getElementById('geo').appendChild(geocoder.onAdd(map));
    descoder.on('result', (e) => {
        let details = e.result;
        finalDes = details.place_name;
        console.log(finalDes);
        });
    document.getElementById('des').appendChild(descoder.onAdd(map));
    Map.zoom = 1;
    
}
function save()
{

    let user_name = document.getElementById('pass_name').value;
    const user_phone = document.getElementById("phone").value;
    let date = new Date();
    passengers.push({
        name : user_name,
        source : srcdes,
        destination : finalDes,
        time:date,
        phone:user_phone
    })
    updateLocalstorage();
    

}
function updateLocalstorage()
{
    localStorage.setItem('key',JSON.stringify(passengers));
    update();
}

export {sourcedes};
export {finalDes};
