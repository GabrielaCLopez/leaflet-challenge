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
d3.json(queryUrl).then(function(data){
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data.features);
  createFeatures(data.features);
});

// Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
// Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
// Hint: The depth of the earth can be found as the third coordinate for each earthquake.
function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place, time, magnitude and depth of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // Define a function to set the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth >=90) {
      return '#C0392B';
    }
    else if (depth >70){
      return '#EC7C3C';
    }
    else if (depth > 50) {
      return '#F39C12';
    }
    else if (depth > 30){
      return '#F1C40F';
    }
    else if (depth > 10){
      return '#2ECC71';
    }
    else {
      return '#1E8449';
    }

  }

  // Define a function to set the radius of the marker based on the magnitude of the earthquake.
  function getRadius(magnitude) {
    return magnitude * 4;
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Use pointToLayer option to create circle markers, and set their size and color based on the magnitude and depth.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  }).addTo(myMap);

// Create a legend to provide context for the map data.
var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var depths = [-10, 10, 30,50, 70, 90];
    var colors = ['#C0392B', '#EC7C3C','#F39C12','#F1C40F','#2ECC71', '#1E8449']

  //   // Add the minimum and maximum.
  //   var legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // Adding the legend to the map
  legend.addTo(myMap);
}