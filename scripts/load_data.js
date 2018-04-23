/*jshint esversion: 6 */
import DataParser from './data_parser';
import YellowParser from './yellow_parser';
import Papa from 'papaparse';
export default function loadData() {
  return $.get({
      url: '../data/sample_yellow_taxi_data.csv'
    }).then(file => {
      Papa.parse(file, {
        complete: (results) => {
          window.data = results.data;
          let parser = new YellowParser(data);
           parser.saveData();
        }
      });
    });
}


//url: '../data/taxi_shortened.csv'
// return $.get({
//     url: '../data/taxi_abbreviated_1.csv'
//   }).then(file => {
//     Papa.parse(file, {
//       complete: (results) => {
//         window.data = results.data;
//         let parser = new DataParser(data);
//          parser.saveData()
