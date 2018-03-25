/*jshint esversion: 6 */
 import init_map from './init_map';
 import load_data from './load_data';
 import Visuals from './visuals';


document.addEventListener("DOMContentLoaded", () => {
  init_map();
  let viz = new Visuals();
  viz.setup();
  load_data();
  //as long as we wait say 10 seconds we will be good, but ideally want to chain as a promise
});



//what will start doing the loading
