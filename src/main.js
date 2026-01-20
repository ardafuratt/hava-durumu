const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherStatus = document.getElementById('weatherStatus');
const suggestion = document.getElementById('box-text');
const timeDisplay = document.getElementById('timeDisplay');
const timeSlider = document.getElementById('timeSlider');

const ApiKey = import.meta.env.VITE_WEATHER_API_KEY;
let forecastList = [];




const body = document.body;




const cityInput = document.getElementById('cityInput');


console.log(cityName)
console.log(temperature)

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        alert("tarayıcınız konum özelliğini desteklemiyor.")
    }
}

    function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude; 
        console.log('konumunuz- enlem: ' + lat + 'boylam:' + lon);

        fetchweather(lat,lon);
    } 

    function showError(error) { 
        alert("Konum alınamadı lütfen konuma izin verin.");
    } 

function fetchweather(lat, lon) {
       
       const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric&lang=tr`; 

       fetch(url)
         .then(response => response.json())
            .then(data => {
                console.log('VERİ GELDİ', data);
              
                    forecastList = data.list;

                    const currentForecast = data.list[0];

                cityName.textContent = data.city.name.toUpperCase();
                 temperature.textContent = Math.round(currentForecast.main.temp) + '°C';
                   weatherStatus.textContent = currentForecast.weather[0].description;

                      console.log('sayfa güncellnedi');

                      const weatherCode = currentForecast.weather[0].main;

                      changeThemeAndSuggestion(weatherCode);

            })
            .catch(error => {
                console.error('HATA OLUŞTU', error);
                alert('Hava durumu verileri alınırken bir hata oluştu.');

            });

}

function changeThemeAndSuggestion(weatherCode) {

           body.className = "";

             if (weatherCode === 'Thunderstorm') {
                body.classList.add('thunder-theme');
                suggestion.textContent = "bugün dışarı çıkma dosti";
            }


                else if (weatherCode === 'Drizzle' || weatherCode === 'Rain') {
                    body.classList.add('rainy-theme');
                    suggestion.textContent = "yanına şemsiye almayı unutma";
                }

                else if (weatherCode === 'Snow') {
                    body.classList.add('snowy-theme');
                    suggestion.textContent = "kalın giyin";}


                    else if (weatherCode === 'Clear') {
                        body.classList.add('sunny-theme');
                         suggestion.textContent = "çık gez yatma evde ";
                    }

                    else if (weatherCode === 'Clouds') {
                        body.classList.add('cloudy-theme');
                         suggestion.textContent = "kahveni al sezen abla dinle";
                     }

                     else if (weatherCode === 'Mist' || weatherCode === 'Fog' || weatherCode === 'Haze')  {
                        
                        body.classList.add('windy-theme');
                            suggestion.textContent = "45 kilo altıysan dışarı çıkma ";
                        }

                        else { 
                            body.classList.add('cloudy-theme');
                             suggestion.textContent = "hava durumu belirsiz dikkatli ol";
                         }
                
                console.log('tema değiştirildi:', weatherCode);
}

function fetchweatherByCity(searchCity) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${ApiKey}&units=metric&lang=tr`;
     
    console.log('şehir aranıyor:', searchCity);

    fetch(url)
      .then(response => response.json())
         .then(data => {
             console.log('VERİ GELDİ', data); 

               forecastList = data.list;
               
               cityName.textContent = data.city.name.toUpperCase();

               const currentForecast = data.list[0];

              
              temperature.textContent = Math.round(currentForecast.main.temp) + '°C';
            weatherStatus.textContent = currentForecast.weather[0].description;
                 
             
             
                

                const weatherCode = currentForecast.weather[0].main;

                changeThemeAndSuggestion(weatherCode);
            })

                         

            .catch(error => {
                console.error('HATA:', error);

                alert('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
            });
}
      // Sürgü hareket ettiğinde
timeSlider.addEventListener('input', function() {
    const hour = parseInt(timeSlider.value);
    
    // Saati güncelle
    timeDisplay.textContent = hour.toString().padStart(2, '0') + ':00';
    
    // O saatteki tahmini bul ve göster
    updateWeatherByHour(hour);
});       
function updateWeatherByHour(selectedHour) { 
     if (forecastList.length === 0) {
        return;
     } 
       let closestForecast = null;   
       let minHourDiff = 24;  

       forecastList.forEach(item => {
              let forecastDate = new Date(item.dt_txt);
              let forecastHour = forecastDate.getHours();

              let hourDiff = Math.abs(forecastHour - selectedHour); 

              if (hourDiff < minHourDiff) {
                  minHourDiff = hourDiff;
                  closestForecast = item;
              } 

              if (forecastHour === selectedHour) {
                closestForecast = item;
              }   
});           
                  
                  if (!closestForecast) { 
                  closestForecast = forecastList[0];
                alert('Seçilen saat için hava durumu verisi bulunamadı.');
                     }


               temperature.textContent = Math.round(closestForecast.main.temp) + '°C';
                weatherStatus.textContent = closestForecast.weather[0].description;
           
                const weatherCode = closestForecast.weather[0].main;
                changeThemeAndSuggestion(weatherCode);
}
  

getLocation(); 

cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();

        if (city === '') { 
            alert('Lütfen bir şehir adı girin.');
            return;
        } 

        fetchweatherByCity(city);
        cityInput.value = '';
    }
});
