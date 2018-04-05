/*jshint esversion: 6 */

import moment from 'moment';

class Trip {
  constructor(trip, map){
    this.trip = trip;
    this.map = map;
    this.setup = this.setup.bind(this);
    this.setup();
    window.circleCount = 0;
    this.setupCircle = this.setupCircle.bind(this);
    this.uptownRide = this.uptownRide.bind(this);
    this.startTimeAsMoment = this.startTimeAsMoment.bind(this);
    this.startTimeAsMoment();
    this.stepNumber = 0;
    this.locationNumber = -1;
    this.stepSeconds = 0;
    this.move = this.move.bind(this);
    this.endTrip = this.endTrip.bind(this);
    this.increment = this.increment.bind(this);
    this.setTaxiHTML = this.setTaxiHTML.bind(this);
  }

  startTimeAsMoment(){
    let formatting = "MM-DD-YYYY hh:mm:ss a";
    this.tripStartTime = moment(this.trip.startTime, formatting);
  }

  uptownRide(){
    return (this.trip.endLat > this.trip.pickupLat);
  }

  setup(){
    this.setupCircle();
  }

  setupCircle(){
    var Circle = new google.maps.Circle({
          strokeColor: (this.uptownRide() ? '#FF0000' : '#00e1ff' ),
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: (this.uptownRide() ? '#FF0000' : '#00e1ff' ),
           fillOpacity: 0.35,
           center: {lat: this.trip.pickupLat, lng: this.trip.pickupLong},
           radius: 80
          });
      console.log('making a circle!');
    Circle.setMap(this.map);
    this.circle = Circle;
  }

  move(){
    if(this.stepNumber !== null){
      let currentStep = this.trip.steps[this.stepNumber];
        // console.log('move');
        // debugger
      let duration = parseInt(Object.keys(currentStep)[0]);
      let latlngs = currentStep[duration].latLngs;
      let locationsPerSecond =  (duration / latlngs.length);
      let nextLocationNumber = Math.round( this.stepSeconds / locationsPerSecond);

      if(this.locationNumber!== nextLocationNumber && nextLocationNumber < latlngs.length){
         let location = latlngs[nextLocationNumber];
         // console.log('inside if');
         this.circle.setCenter({lat: location[0], lng: location[1]});
         this.locationNumber += 1;
       }

      if(this.stepSeconds === duration || (duration === 0) ){
          // console.log('inside end statement');
          // // debugger
        if(this.stepNumber === this.trip.steps.length-1 || (duration === 0)) {
            this.endTrip();
        } else {
        this.stepNumber += 1;
        this.stepSeconds = 0;
        this.locationNumber = -1;
        }
      }
    }
  }




  endTrip(){
    this.circle.setMap(null);
    this.stepNumber = null;
    window.quantityTaxis -= 1;
    this.setTaxiHTML();
  }


  setTaxiHTML(){
    let label = document.getElementById("quantityTaxis");
    label.innerHTML = `There are currently ${quantityTaxis} Green Taxis out and about!`;
  }



  increment(){
    this.stepSeconds += 1;
    this.move(this.trip);
  }




}


export default Trip;
