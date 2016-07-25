var state ={
  weather: ""
}

var Weather = function(){
  var api = 'http://api.openweathermap.org/data/2.5/forecast?lat= '
  lat = country.lat
  lng= '&lon=' +country.lng 
  API_key = '&APPID=7a6000a1bfd641e8ac4cf9a2a156245c'
  var url = api + lat  +  lng + API_key
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);
  request.onload = function () {
    if(request.status === 200){
      JsonString = request.responseText;
      
      state.weather = JSON.parse( JsonString);

    }
    console.log(state.weather)
  }
}

var Map = function(latLng){
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: 18
  }),
  this.addMarker = function(latLng, title, icon){
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: title,
      icon: icon
    });
    return marker
  },
  this.bindClick = function(){
    google.maps.event.addListener(this.map, 'click', function(event){
      this.addInfoWindow({lat: event.latLng.lat(), lng: event.latLng.lng()}, "Weather", "https://upload.wikimedia.org/wikipedia/commons/c/c5/Weather_Icons_-_hi_tsra.svg");
    }.bind(this));
    console.log(latLng)
  },

  this.addInfoWindow = function(latLng, title, icon){
    var marker = this.addMarker(latLng, title, icon);
    marker.addListener('click', function() {
      var infowindow = new google.maps.InfoWindow({
          content: this.title
        });
      infowindow.open(this.map, marker);
    });
  }
}


