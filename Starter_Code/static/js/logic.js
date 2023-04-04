// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    //layers: [street, earthquakes]
  });
  
  // Adding tile layers
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(myMap);


// Perform a GET request to the query URL/      
d3.json(queryUrl).then(function(data) {
    // console.log(data)

    let earthquake=data[i];
  
    // Add circles to the map.
    L.circle(data.geometry,{
      'radius': Math.sqrt(data.geometry,)*500
    }).addTo(myMap);
});

    // Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
    // Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    // Hint: The depth of the earth can be found as the third coordinate for each earthquake.


    // Include popups that provide additional information about the earthquake when its associated marker is clicked.





    // Create a legend that will provide context for your map data





// // Create the map
// function createMap(earthquakes){ 


//     // Create a baseMaps object.
//     var baseMaps = {
//       "Street Map": street,
//       "Topographic Map": topo
//     };
  
//     // Create an overlay object to hold our overlay.
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
















// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes);
// }



//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps).addTo(myMap);