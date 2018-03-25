/*jshint esversion: 6 */
import DataParser from './data_parser';
import Papa from 'papaparse';
export default function loadData() {
  let parser = new dataParser();
  $.get({
      url: '../data/taxi_shortened.csv'
    }).then(file => {
      Papa.parse(file, {
        complete: (results) => {
          window.data = results.data;
          // window.parsed = dataParser.format(data);
        }
      });
    });
}
