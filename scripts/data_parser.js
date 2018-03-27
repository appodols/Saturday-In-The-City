/*jshint esversion: 6 */
class DataParser{
  constructor(rows){
    this.rows = rows;
    this.database = firebase.database();
    this.storage = firebase.storage();
    window.trips = this.database.ref('trips');
    this.saveData = this.saveData.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
    window.parseSteps = this.parseSteps.bind(this);
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

     generateDetails(row){
      let trip = {};
      trip.pickupLong = parseFloat(row[5]);
      trip.pickupLat = parseFloat(row[6]);
      trip.endLong = parseFloat(row[7]);
      trip.endLat = parseFloat(row[8]);
      let directionsService = new google.maps.DirectionsService();
      let request = {
                      origin: new google.maps.LatLng(trip.pickupLat, trip.pickupLong),
                      destination: new google.maps.LatLng(trip.endLat, trip.endLong),
                      travelMode: google.maps.TravelMode.DRIVING
                  };
      console.log('before direction block');
    directionsService.route(request, function (response, status) {
      console.log('inside directionsService block');
      if (status == google.maps.DirectionsStatus.OK) {
          console.log('insideDirectionsServiceOK');
          trip.steps = parseSteps(response.routes[0].legs[0].steps);
          trips.push(trip);
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










 } // end of input



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












export default DataParser;
