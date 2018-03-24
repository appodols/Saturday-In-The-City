/*jshint esversion: 6 */
 import init_map from './init_map';
 import load_data from './load_data';
 import Visuals from './visuals';


document.addEventListener("DOMContentLoaded", () => {
  init_map();
  load_data();
  let viz = new Visuals();
  viz.setup();
});



//what will start doing the loading
