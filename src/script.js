window.addEventListener('load', () => {
    let long;
    let lat;

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
              "x-rapidapi-key": "ec5a0bdab9msh9473d016b97e789p1b1b26jsn4dd63aa6c2cd"
              }
          })
          .then(resp => resp.json())
          .then(data => {
              console.log(data);
          })
          .catch(err => {
              console.error(err);
          });
      });
    }
});


function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }
  
  function fadeOut(){
    setInterval(loader, 3000);
  }
  
  window.onload = fadeOut;