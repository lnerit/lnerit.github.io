function functionOne() { alert('You clicked the top text'); }
function callmap(){
	var lat=-41.285361,lng=174.778647;
	locationName="TSB Bank,Wellington";
	initialize(lat,lng);
	alert("test");
}
//array initialized with lecture room location data
var data=[{location:"TSB Bank,Wellington",lat:-41.285361, lng:174.778647},
	  {location:"Brisbane Convention & Exhibition Centre",lat:-27.476503, lng:153.018363},
	  {location:"Trusts Stadium, Auckland",lat:-36.860666, lng:174.634973},
		  {location:"Energy Events Centre, Rotorua",lat:-38.135789, lng:176.260872},
	]
//This function is called upon clicking the nodes to determin the location the map.
//If the name of the clicked node matches those lecture venue names, then
//the location is display on the map.
/**
function click(d) {
       if(d.name==data[0].location){
		initialize(data[0].lat,data[0].lng,data[0].location);
   	}
	 if(d.name==data[1].location){
		initialize(data[1].lat,data[1].lng,data[1].location);
   	}
 	if(d.name==data[2].location){
		initialize(data[2].lat,data[2].lng,data[2].location);
   	}
 	if(d.name==data[3].location){
		initialize(data[3].lat,data[3].lng,data[3].location);
   	}
 	if(d.name==data[4].location){
		initialize(data[4].lat,data[4].lng,data[4].location);
   	}
}

*/

function initialize(lat,lng) {
       latlng=new google.maps.LatLng(lat,lng,locationName);
  var mapOptions = {
    zoom: 18,
    center: latlng

  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
	//set marker on the map
      var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: locationName
      });
}
google.maps.event.addDomListener(window, 'load', initialize);
