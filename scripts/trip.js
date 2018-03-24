/*jshint esversion: 6 */


class Trip {
  constructor(row, map){
    this.row = row;
    this.map = map;
    this.setup = this.setup.bind(this);
    this.uptownRide = this.uptownRide.bind(this);
    this.pickupLong = parseFloat(this.row[5]);
    this.pickupLat = parseFloat(this.row[6]);
    this.endLong = parseFloat(this.row[7]);
    this.endLat = parseFloat(this.row[8]);
    this.setupCircle = this.setupCircle.bind(this);
    this.setupDirections = this.setupDirections.bind(this);
    this.setup();
  }

  //we are making a temporary method called setup
  //that gets the colors and sets the location

  uptownRide(){
    return (this.endLat > this.pickupLat);
  }

  setupDirections(){
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    let request = {
                    origin: new google.maps.LatLng(this.pickupLat, this.pickupLong),
                    destination: new google.maps.LatLng(this.endLat, this.endLong),
                    travelMode: google.maps.TravelMode.DRIVING
                };
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          directionsDisplay.setMap(this.map);
      var steps = response.routes[0].legs[0].steps;
      }
    });
    this.steps = steps;
  }

  setup(){
    this.setupCircle();
    this.setupDirections();
    debugger
  }

  setupCircle(){
    var Circle = new google.maps.Circle({
          strokeColor: (this.uptownRide() ? '#FF0000' : '#00e1ff' ),
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: (this.uptownRide() ? '#FF0000' : '#00e1ff' ),
           fillOpacity: 0.35,
           center: {lat: this.pickupLat, lng: this.pickupLong},
           radius: 10
          });
    Circle.setMap(this.map);
  }




  increment(){




  }

//questions...a) when the object is created,
//I make it with a) a starting location, and b) ending location
//c) use Google maps to
//figure out the overview_paths, and then have to somehow map over them



}


export default Trip;
