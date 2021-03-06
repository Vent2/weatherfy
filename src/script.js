
const searchElement = document.querySelector('[data-city-search]');
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const iconLocation = document.querySelector('.icon');
const temperatureSection = document.querySelector('.degree-section');
const temperatureSpan = document.querySelector('.degree-section span');
const searchBox = new google.maps.places.SearchBox(searchElement);

function setWeatherData(data, place = data.timezone.split('/')[1].replace (/_/g, " ")) {
  locationTimezone.textContent = place;
  temperatureDescription.textContent = data.currently.summary;
  temperatureDegree.textContent = Math.floor(data.currently.temperature);
  let celsius = (data.currently.temperature - 32) * (5 / 9);
  temperatureSpan.textContent = 'F';
  //Set Icon
  setIcon = new Skycons({color: 'whitesmoke'});
  setIcon.set(iconLocation, data.currently.icon);
  setIcon.play();
  
  temperatureSection.addEventListener('click', () => {
    if(temperatureSpan.textContent === "F") {
      temperatureSpan.textContent = "C"
      temperatureDegree.textContent = Math.floor(celsius);
    } else {
      temperatureSpan.textContent = "F";
      temperatureDegree.textContent = Math.floor(data.currently.temperature);
    }
  })
}

  

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return
  const lat = place.geometry.location.lat();
  const long = place.geometry.location.lng();
 
  fetch(`https://dark-sky.p.rapidapi.com/${lat},${long}?lang=en&units=auto`, {
    "method": "GET",
          "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": 'ec5a0bdab9msh9473d016b97e789p1b1b26jsn4dd63aa6c2cd'
          }
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          setWeatherData(data, place.formatted_address.split(',')[0]);
        })
        .catch(err => {
          console.error(err);
      })
  })



  
  
  
  
  
  function fetchingData(lat, long) {
    return fetch(`https://dark-sky.p.rapidapi.com/${lat},${long}?lang=en&units=auto`, {
    "method": "GET",
          "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": 'ec5a0bdab9msh9473d016b97e789p1b1b26jsn4dd63aa6c2cd'
          }
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          setWeatherData(data);
        })
        .catch(err => {
          console.error(err);
      })
  }
  

  
  
  // Load Animation
  
  function loader(){
      document.querySelector('.loader-container').classList.add('fade-out');
    }
    
    function fadeOut(){
      setInterval(loader, 1700);
    }
    window.onload = fadeOut