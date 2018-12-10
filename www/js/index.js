var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        /*this.receivedEvent('deviceready');*/
		
		
		var onSuccess = function(position) {
			
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			
			//console.log(lat)
			
			
			$.ajax({ //ajax weather recuperer donnees avec coord gps
				type: "GET",
				dataType: "json",
				url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=c6f7c305685d791568deb77d851e9c3b&lang=fr",
				
				success: function(data) {


					var city_name = data.name;
					var general = data.weather[0].main;
					var description = data.weather[0].description;
					var icon = data.weather[0].icon;
					var temp = Math.round(data.main.temp - 273.15);
					var celsiusmin = Math.round(data.main.temp_min - 273.15);
					var celsiusmax = Math.round(data.main.temp_max - 273.15);

				  console.log(city_name);
		
					//$("#meteo").html(weather_now);
					$("#nom_ville").html(city_name);
					$("#icone").html('<img src="img/'+icon+'.png">');
					$("#description").html(description);
					$("#temperature").html(temp+'°C');
					$("#temp_min").html('Min : <b>'+celsiusmin+'</b>°C');
					$("#temp_max").html('Max : <b>'+celsiusmax+'</b>°C');
								  
	                               
         }, // success
                  		
				
	 }); ///END AJAX WEATHER////
			
				
    }; // On succes recup geoloc

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();