/*jshint esversion: 6 */
class YellowParser{
  constructor(rows){
    this.rows = rows;
    this.database = firebase.database();
    this.storage = firebase.storage();
    window.trips = this.database.ref('trips-yellow');
    this.saveData = this.saveData.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
    this.timeParser = this.timeParser.bind(this);
    window.parseSteps = this.parseSteps.bind(this);
    // window.parsePath = this.parsePath.bind(this);
  }

 saveData(){
   //careful here because we need this to these calls to be syncrnous and they won't be
   //you could use //setTimeOut and set up a conservative amount of time..say 2 seconds
     this.rows.forEach((row, i)=>{
          setTimeout(() => {
            this.generateDetails(row);
          }, 1000 * i);
        });
   }



    timeParser(data){

      data = data.split(" ");
      let date_times = data[0].split("-");
      let year = date_times[0];
      let month = date_times[1];
      let day = date_times[2];

      let time_times = data[1].split(":");
      let hours = time_times[0];
      let minutes = time_times[1];
      let seconds = time_times[2];
      let ampm = hours > 12 ? 'PM' : 'AM';
      let formatted = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`
      return formatted;
      //goal: "06/04/2016 05:24:06 AM"
    }


     generateDetails(row){
      let trip = {};
      trip.pickupLong = parseFloat(row[6]);
      trip.pickupLat = parseFloat(row[7]);
      trip.endLong = parseFloat(row[10]);
      trip.endLat = parseFloat(row[11]);
      trip.startTime = this.timeParser(row[2]);
      trip.endTime = this.timeParser(row[3]);
      console.log('made trip');
      let directionsService = new google.maps.DirectionsService();
      let request = {
                      origin: new google.maps.LatLng(trip.pickupLat, trip.pickupLong),
                      destination: new google.maps.LatLng(trip.endLat, trip.endLong),
                      travelMode: google.maps.TravelMode.DRIVING
                  };
    directionsService.route(request, function (response, status) {
        console.log('in status stuff');
      if (status == google.maps.DirectionsStatus.OK) {
          trip.steps = parseSteps(response.routes[0].legs[0].steps);
          // trip.path = parsePath(response.routes[0].overview_path);
          trips.push(trip);
          console.log('yay we pushed');
      }
    });

   }


   parseLatLngs(latlngs){
    let latlngsCalled = [];
      latlngs.forEach((location)=>{
        latlngsCalled.push([location.lat(),location.lng()]);
      });
      return latlngsCalled;
   }

   parseSteps(steps) {
    let step_locations = [];
    steps.forEach((step)=>{
      step_locations.push({
        [step.duration.value]: {latLngs: this.parseLatLngs(step.lat_lngs)}
      });
    });
    return step_locations;
   }


}

  // end of input



  //each trip needs the following attributes
  //a) pickupLat
  //b) pickupLong
  //c) we will set the circle in the trip
  //d) new directions
  //e) question...how do we ensure that the async nature of making the directions request
  //f) we need the legs of the response
  //g) I need the steps
  //h) I need the overall response because I also need the last step
    //first we need the direction, and then we need to save the infromation
    //we can do this in 2 ways
    //a) we chain a promise together
    //or b) we pass in the infromation in the body of the async function
    //












export default YellowParser;
