/*jshint esversion: 6 */

import Papa from 'papaparse';
export default function loadData() {
  $.get({
      url: '../data/taxi_formatted_1.csv'
    }).then(file => {
      Papa.parse(file, {
        complete: (results) => {
          window.data = results.data;
        }
      });
    });
}
