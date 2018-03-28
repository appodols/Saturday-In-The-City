/*jshint esversion: 6 */
import moment from 'moment';
import Trip from './trip';

class Visuals {
  constructor(){
    this.time = moment("2016-06-04 05:24:00");
    window.time = this.time;
    this.interval = 300;
    this.startClock = this.startClock.bind(this);
    this.currentTrips = [];
    this.dataIndex = 0;
    //note this may need to change with the real data
    this.addTrips = this.addTrips.bind(this);
    this.incrementTrips = this.incrementTrips.bind(this);
    this.nextRideStarted = this.nextRideStarted.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
    this.paused = false;
    this.database = firebase.database();
    this.retrieveData = this.retrieveData.bind(this);
    this.parsedData = [];
    window.parsedData = this.parsedData;
    this.retrieveData();
  }

  retrieveData(){
    let ref = this.database.ref('trips');
    ref.once('value').then(snapshot => {
        snapshot.forEach(childSnap => {
          this.parsedData.push(childSnap.val());
        });
    });
}

  addTrips(){
    while(this.nextRideStarted()){
      let currentTrip = new Trip(this.parsedData[this.dataIndex], map);
      this.dataIndex += 1;
      this.currentTrips.push(currentTrip);
    }

  }


  incrementTrips(){
    this.currentTrips.forEach(trip=>{
      trip.increment(trip);
    });
  }

  startClock (){
    let clock = document.getElementById("clock");
    setInterval( ()=>{
      if(!this.paused){
        this.time.add(1, 's');
        this.incrementTrips();
        this.addTrips();
        clock.innerHTML = this.time.format("HH mm ss");
      }
    }, 1000);

  }

  pauseClock () {
    this.paused = !this.paused;
  }


  nextRideStarted(){
    let nextTrip = this.parsedData[this.dataIndex];
    let nextStartTime = nextTrip.startTime;
    let formatting = "MM-DD-YYYY hh:mm:ss a";
    let nextTripMoment = moment(nextStartTime, formatting);
    return nextTripMoment.isBefore(this.time);
  }


  setup(){
    $(".start-clock").on('click', this.startClock);
    $(".pause-clock").on('click', this.pauseClock);
  }



}






export default Visuals;
