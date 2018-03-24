/*jshint esversion: 6 */
import moment from 'moment';
import Trip from './trip';

class Visuals {
  constructor(){
    this.time = moment("2016-06-04 05:24:00");
    this.interval = 300;
    this.startClock = this.startClock.bind(this);
    this.currentTrips = [];
    this.dataIndex = 1;
    this.addTrips = this.addTrips.bind(this);
    this.incrementTrips = this.incrementTrips.bind(this);
    this.nextRideStarted = this.nextRideStarted.bind(this);
  }


  addTrips(){
    while(this.nextRideStarted()){
      let currentTrip = new Trip(data[this.dataIndex]);
      this.dataIndex += 1;
      this.currentTrips.push(currentTrip);
    }

    //gets time
    //starts with index
    //while loop
    //goes through array adding items to this.trips while starting time is less than the current time
    // I make a new Trip Object and add it to this.trips
    //we handle the logic for deleting the trip from the trip class
  }


  incrementTrips(){
    //goes through trips and forEach trip
    //increments the trip
  }

  startClock (){
    let clock = document.getElementById("clock");
    setInterval( ()=>{
      this.time.add(1, 's');
      this.nextRideStarted();
      this.addTrips();
      clock.innerHTML = this.time.format("HH mm ss");
    }, 1000);

  }


  nextRideStarted(){
    let nextTrip = data[this.dataIndex];
    let nextStartTime = nextTrip[1];
    let formatting = "MM-DD-YYYY hh:mm:ss a";
    let nextTripMoment = moment(nextStartTime, formatting);
    return nextTripMoment.isBefore(this.time);
  }








  setup(){
    $(".start-clock").on('click', this.startClock);

  }



}






export default Visuals;
