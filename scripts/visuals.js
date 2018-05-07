/*jshint esversion: 6 */
import moment from 'moment';
import Trip from './trip';

class Visuals {
  constructor(){
    this.time = moment("2016-06-04 05:24:00");
    this.startTime = moment("2016-06-04 05:24:00");
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
    this.restartClock = this.restartClock.bind(this);
    this.paused = false;
    this.database = firebase.database();
    this.retrieveData = this.retrieveData.bind(this);
    // this.resumeClock = this.resumeClock.bind(this);
    window.quantityTaxis = 0;
    this.parsedData = [];
    this.retrieveData();
    this.started = false;
    this.setTaxiHTML = this.setTaxiHTML.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.everStarted = false;
    console.log('constructor');
  }

  retrieveData(){
    let ref = this.database.ref('trips');
    ref.once('value').then(snapshot => {
        snapshot.forEach(childSnap => {
          this.parsedData.push(childSnap.val());
        });
        // this.parsedData = this.parsedData.slice(0,20);
        window.parsedData = this.parsedData;
      });
    //reduce size of dataset
}




  addTrips(){
    while(this.nextRideStarted() && this.dataIndex <= this.parsedData.length-1){
      let currentTrip = new Trip(this.parsedData[this.dataIndex], map);
      window.quantityTaxis += 1;
      this.setTaxiHTML();
      this.dataIndex += 1;
      this.currentTrips.push(currentTrip);
    }

  }


   setTaxiHTML(){
    let label = document.getElementById("quantityTaxis");
    label.innerHTML = `There are currently ${quantityTaxis} Green Taxis out and about!`;
  }



  incrementTrips(){
    this.currentTrips.forEach(trip=>{
      trip.increment();
    });
  }

  startClock (){





  if(this.started === false){
      this.started = true;
      let clock = document.getElementById("clock");
      setInterval( ()=>{
        if(!this.paused){
          this.time.add(1, 's');
          this.incrementTrips();
          this.addTrips();
          clock.innerHTML = this.time.format("HH mm ss");
        }
      }, 50);
    }
  }

  setStartTime(e){
        let startTime = e.target.value.split(":");
        let hours = startTime[0];
        let minutes = startTime[1];
        this.startTime = moment(`2016-06-04 ${hours}:${minutes}:00`);
  }






  pauseClock () {
    let pauseButton = document.getElementsByClassName("pause-clock")[0];
    this.paused = !this.paused;
    if(this.paused){
      pauseButton.innerHTML = 'Resume';
    } else {
      pauseButton.innerHTML = 'Pause';
    }
  }


  nextRideStarted(){
    if(this.dataIndex > this.parsedData.length-1) return false;
    let nextTrip = this.parsedData[this.dataIndex];
    let nextStartTime = nextTrip.startTime;
    let formatting = "MM-DD-YYYY hh:mm:ss a";
    let nextTripMoment = moment(nextStartTime, formatting);
    return nextTripMoment.isBefore(this.time);
  }

  restartClock(){
    this.currentTrips.forEach(trip=>{
     trip.endTrip();
   });
    this.currentTrips = [];
    this.dataIndex = 0;
    window.quantityTaxis = 0;
    this.paused = false;
    let pauseButton = document.getElementsByClassName("pause-clock")[0];
    pauseButton.innerHTML = 'Pause';
    this.time = this.startTime;
    let clock = document.getElementById("clock");
    clock.innerHTML = this.time.format("HH mm ss");
  }


  setup(){
    $(".start-clock").on('click', this.startClock);
    $(".pause-clock").on('click', this.pauseClock);
    $(".restart-clock").on('click', this.restartClock);
    $(".resume-clock").on('click', this.resumeClock);
    $(".start-time-selector").on('click',this.setStartTime);
  }

}






export default Visuals;
