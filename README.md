[Link to the Live Version] -- to be updated soon

# Saturday In The City
  Saturday In The City visually displays taxi traffic as a representation of the movement in New York on a typical Saturday starting at sunrise at 5:25:00AM, and ending at sunrise on Sunday at 5:25:00AM the next morning.  
## About
  This visualization uses data from NYC Open Data to animate taxis as they drove on 6/6/2015.  Each circle on the map represents one single taxi-ride. Uptown rides are colored red; downtown rides are colored blue.  I assume that the driver drove the route recommended by Google Maps. The data is stored on Firebase to reduce the number of asynchronous requests that need to be made.

## Features
 1. Users can start / pause the animation
 2. Users can restart the animation
 3. Users can start the animation at any time within the 24 hour time cycle.

## Implementation
  Each taxi is rendered as a shape on the Google Maps object.  NYC Open data provides starting longitude/ latitude and ending longitude /   latitude information about the taxi's route.  When given two coordinates, Google Maps API can generate waypoints.  I use these waypoints   to reset the location of each taxi; when done frequently enough this gives the illusion of movement.

  When the user starts the clock in the application, I first go through the data (the data is chronologically organized, and add all taxis   whose start time is before the current time to the map.  This can be modeled by the following code:
  ```javascript
    addTrips(){
    while(this.nextRideStarted() && this.dataIndex <= this.parsedData.length-1){
      let currentTrip = new Trip(this.parsedData[this.dataIndex], map);
      window.quantityTaxis += 1;
      this.setTaxiHTML();
      this.dataIndex += 1;
      this.currentTrips.push(currentTrip);
    }

  }
```
As the time increases every second, I iterate through all currentTrips and increment their location.  Each taxi keeps track of how close it is to the next waypoint provided by Google Maps API, and reanimates itself along its next step at the appropriate time.  This can be modeled by the following code:
```javascript
  increment(){
    this.stepSeconds += 1;
    this.move(this.trip);
  }

 ```

## Technologies Used


* Firebase
* Javascript


## Future Updates

The highest priority features is allowing both yellow and green taxis to be displayed.
