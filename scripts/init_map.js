/* global google */
/*jshint esversion: 6 */
//
 export default function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.758896, lng: -73.985130 },
    zoom: 13,
  });

  map.data.setStyle({
    fillColor: 'green',
    strokeWeight: 1
  });


}
