  function initMap() {
      var locations = [];
      var arr = [];

	    fetch('https://api.agrihawk.in/api/devices/getMarkers?access_token=EFxkmrvH1zoctRpH7Q3X5nZhOSIj5E6lmM2wrdF4PJtOJnOdOztfQcatpBux4vck')
	       .then(response  => {
		          return response.json();
	         })
	       .then(users => {
		            for(var i = 0;i< users.length;i++){
			              locations.push([users[i].place,users[i].location.lat,users[i].location.lng,i]);
		            }//END OF loop

  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(16.84083, 74.69225),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();
  var marker, i;

  for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
  });

 fetch("https://api.agrihawk.in/api/plots/getLatestDataForMap?plotId="+users[i].plotId+"&access_token=EFxkmrvH1zoctRpH7Q3X5nZhOSIj5E6lmM2wrdF4PJtOJnOdOztfQcatpBux4vck")
 .then(response  => {
       return response.json();
  })
 .then(data => {
    arr.push(data);
 })//END OF DATA API

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent('<h2>'+locations[i][0]+'</h2>'+'</br>' +'<b>Timestamp :</b>'
        +JSON.stringify(arr[i].timestamp) +'</br>' +'<b>AirTemp :</b>'
        +JSON.stringify(arr[i].airTemp)+'</br>'+'<b>AirHumidity :</b>'
        +JSON.stringify(arr[i].airHumidity)+'</br>'+'<b>LeafWetness :</b>'
        +JSON.stringify(arr[i].leafWetness)+'</br>'+'<b>LightIntensity :</b>'
        +JSON.stringify(arr[i].lightIntensity)+'</br>'+'<b>RainFall :</b>'
        +JSON.stringify(arr[i].rainFall));
      infowindow.open(map, marker);
    }
  })(marker, i));
    }
    });//END OF LOCATION API
    }