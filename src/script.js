

window.addEventListener('load', () => {
  const DARK_SKY_APIKEY = process.env.DARK_SKY_APIKEY;
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const iconLocation = document.querySelector('.icon');
    const temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span'); 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        //   const proxy = 'https://cors-anywhere.herokuapp.com/';        
        const api = `https://dark-sky.p.rapidapi.com/${lat},${long}?lang=en&units=auto` 
        
        fetch(api, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": DARK_SKY_APIKEY
          }
        })
        .then(resp => resp.json())
        .then(data => {
          //Get Elements from API
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //Set DOM Elements from API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Formula for celsius
          let celsius = (temperature - 32) * (5 / 9);
          //Set Icon
            setIcon = new Skycons({color: 'whitesmoke'});
            setIcon.set(iconLocation, icon);
            setIcon.play();

          //Change temperature to Celsius/Fahrenheit
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C"
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          })
          })
          .catch(err => {
              console.error(err);
          });
      });
    }
  });
  
  
  
  
  
  
  
  
  
  // Load Animation
  
  function loader(){
      document.querySelector('.loader-container').classList.add('fade-out');
    }
    
    function fadeOut(){
      setInterval(loader, 1700);
    }
    window.onload = fadeOut;