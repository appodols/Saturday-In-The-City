/* global google */
/*jshint esversion: 6 */
//
//  export default function initMap () {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 40.758896, lng: -73.985130 },
//     zoom: 13,
//   });
// }


// import {styles} from 'style_map';

var poly;
var map;
var directionsService;
var directionsDisplay;

export default function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
     center: { lat:  40.741991, lng: -73.957486 },
     zoom: 13,
     heading: 90,
     styles: [
       {
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#212121"
           }
         ]
       },
       {
         "elementType": "labels.icon",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#757575"
           }
         ]
       },
       {
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#212121"
           }
         ]
       },
       {
         "featureType": "administrative",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#757575"
           }
         ]
       },
       {
         "featureType": "administrative.country",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#9e9e9e"
           }
         ]
       },
       {
         "featureType": "administrative.land_parcel",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "administrative.locality",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#bdbdbd"
           }
         ]
       },
       {
         "featureType": "poi",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#757575"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#181818"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#616161"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "labels.text.stroke",
         "stylers": [
           {
             "color": "#1b1b1b"
           }
         ]
       },
       {
         "featureType": "road",
         "elementType": "geometry.fill",
         "stylers": [
           {
             "color": "#2c2c2c"
           }
         ]
       },
       {
         "featureType": "road",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#8a8a8a"
           }
         ]
       },
       {
         "featureType": "road.arterial",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#373737"
           }
         ]
       },
       {
         "featureType": "road.highway",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#3c3c3c"
           }
         ]
       },
       {
         "featureType": "road.highway.controlled_access",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#4e4e4e"
           }
         ]
       },
       {
         "featureType": "road.local",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#616161"
           }
         ]
       },
       {
         "featureType": "transit",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#757575"
           }
         ]
       },
       {
         "featureType": "water",
         "elementType": "geometry",
         "stylers": [
           {
             "color": "#000000"
           }
         ]
       },
       {
         "featureType": "water",
         "elementType": "labels.text.fill",
         "stylers": [
           {
             "color": "#3d3d3d"
           }
         ]
       }
     ]
  });
  directionsDisplay.setMap(map);
  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

   var app_academy = new google.maps.LatLng(40.754475, -73.984438);
   var home = new google.maps.LatLng(40.708426, -74.005820);
   var cityCircle = new google.maps.Circle({
         strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          center: {lat: 40.72552, lng: -73.97254000000001},
          radius: 10
         });
  cityCircle.setMap(map);
  poly.setMap(map);
  map.addListener('click', addLatLng);
  // cityCircle.setCenter({lat: 38.933583 , lng: -77.045484 });
  // cityCircle.setMap(map);
  window.map = map;
  // calcRoute();
}




function calcRoute() {
  var app_academy = new google.maps.LatLng(40.754475, -73.984438);
  // var washington_dc = new google.maps.LatLng(38.933583,  -77.045484);
  // var los_angeles = new google.maps.LatLng(34.0522,  -118.2437);
  var home = new google.maps.LatLng(40.708426, -74.005820);
  var request = {
                  origin: app_academy,
                  destination: home,
                  travelMode: google.maps.TravelMode.DRIVING
              };
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
        debugger
    }
  });
}








//Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });
}
