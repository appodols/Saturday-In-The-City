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
    this.findStepNumber = this.findStepNumber.bind(this);
    this.locationNumber = 0;
    this.stepSeconds = 0;
    this.move = this.move.bind(this);
    this.endTrip = this.endTrip.bind(this);
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
           radius: 30
          });
      console.log('making a circle!');
    Circle.setMap(this.map);
    this.circle = Circle;
  }


  findStepNumber(seconds){


  }

  completedStepsSeconds(){
    if(this.stepNumber === 0) return 0;
    let completedSteps = this.trips.steps.slice(0,this.stepNumber);
    let durations = [];
    completedSteps.forEach((step)=>{durations.push(parseInt (Object.keys(step)[0]));});
    return durations.reduce((acc,el)=>(acc+el));
  }

  move(){
    let currentStep = this.trip.steps[this.stepNumber];
    this.stepSeconds += 1;
    let duration = Object.keys(currentStep)[0];
    let latlngs = currentStep[duration].latLngs;
    let locationsPerSecond =  (duration / latlngs.length);
    let nextLocationNumber = Math.round( this.stepSeconds / locationsPerSecond);

      if(this.locationNumber!== nextLocationNumber){
        let location = latlngs[nextLocationNumber];
        this.circle.setCenter({lat: location[0], lng: location[1]});
        this.locationNumber += 1;
      }

      if(this.stepNumber === this.trips.steps[this.trips.steps.length-1]
        && nextLocationNumber === latlngs.length-1){
          this.endTrip();
        }


  }



  endTrip(){
    this.Circle.setMap(null);
  }







  increment(trip){
    let duration = moment.duration(time.diff(this.tripStartTime));
    let seconds =  duration.asSeconds();
    this.move(seconds, trip);
    //tell me how far into the step I am relatively
    //move function with step, and duration into step

    //we have access to each of the steps
    //calculate the time that has ellapsed...
    //one function that tells me which step I'm in
    //another that tells me how much time has ellapsed within that step
    //round down/up to the lngs and lats array and sets Circle accordingly

  }

//questions...a) when the object is created,
//I make it with a) a starting location, and b) ending location
//c) use Google maps to
//figure out the overview_paths, and then have to somehow map over them



}


export default Trip;
