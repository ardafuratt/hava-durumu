const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherStatus = document.getElementById('weatherStatus');
const suggestion = document.getElementById('box-text');
const timeDisplay = document.getElementById('timeDisplay');
const timeSlider = document.getElementById('timeSlider');

let animationId = null;


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
                      updateBackgroundImage(data.city.name);

            })
            .catch(error => {
                console.error('HATA OLUŞTU', error);
                alert('Hava durumu verileri alınırken bir hata oluştu.');

            });

}

function changeThemeAndSuggestion(weatherCode) {

           body.className = ""; 

              stopAllAnimations();
                 
                if (weatherCode === 'Drizzle' || weatherCode === 'Rain' || weatherCode === 'Thunderstorm') {
                 
                    startRainyAnimation();
                    suggestion.textContent = "yanına şemsiye almayı unutma";
                }

                else if (weatherCode === 'Snow') {
                    
                    startSnowAnimation();
                    suggestion.textContent = "kalın giyin";}


                    else if (weatherCode === 'Clear') {
                       
                        startSunnyAnimation();
                         suggestion.textContent = "çık gez yatma evde ";
                    }

                    else if (weatherCode === 'Clouds'|| weatherCode === 'mist'|| weatherCode === 'Fog' || weatherCode === 'Haze') {
                            
                            startCloudyAnimation();
                         suggestion.textContent = "kahveni al sezen abla dinle";
                     }
                                           else { 
                           
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

                 updateBackgroundImage(searchCity);
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


// weather animation 

function startRainyAnimation() {

    if (animationId) {
        cancelAnimationFrame(animationId); 
    }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  
  canvas.style.display = 'block';

  let particles = [];
  const particleCount = 300;

  for(let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -1 + Math.random() * 2,
      ys: Math.random() * 5 + 7
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    
    ctx.strokeStyle = 'rgba(174,194,224,0.6)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for(let i = 0; i < particles.length; i++) {
      let p = particles[i];
      
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
      ctx.stroke();

      p.x += p.xs;
      p.y += p.ys;

      if(p.y > h * 0.4) { 
        p.y = -20;
        p.x = Math.random() * w;
      }
    }

    animationId = requestAnimationFrame(draw); 
  }

  draw();
}

function startSnowAnimation() {
  if (animationId) cancelAnimationFrame(animationId); 

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  let particles = [];
  // 400 tane kar tanesi oluşturuyoruz
  for (let i = 0; i < 400; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 3 + 0.5,
      speed: Math.random() * 1 + 0.5,
      wind: Math.random() * 2 - 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.beginPath();

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);

      p.y += p.speed;
      p.x += p.wind;

     
      if (p.y > h * 0.4) {
        p.y = -10;
        p.x = Math.random() * w;
      }
    }
    ctx.fill();
    animationId = requestAnimationFrame(draw);
  }
  draw();
}
function stopAllAnimations() {
 
  if (animationId) {
    cancelAnimationFrame(animationId); 
    animationId = null; 
  }
  

  const canvas = document.getElementById('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    canvas.style.display = 'none';
  }
  
  const weatherCanvas = document.getElementById('weather-animation-canvas');
  if (weatherCanvas) {
    weatherCanvas.remove();
  }
}




function startSunnyAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId); 
    }
    
    const canvas = document.createElement('canvas');
    canvas.id = 'weather-animation-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';  
    canvas.style.zIndex = '5';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    
    const sun = {
        x: 100,
        y: 100,
        radius: 50,
        glowIntensity: 0.5
    };

    let direction = 1;

    function animate() {
   
        ctx.clearRect(sun.x - 150, sun.y - 150, 300, 300);

    
        sun.glowIntensity += 0.015 * direction;
        if (sun.glowIntensity >= 1) {
            sun.glowIntensity = 1;
            direction = -1;
        } else if (sun.glowIntensity <= 0.4) {
            sun.glowIntensity = 0.4;
            direction = 1;
        }

        
        for (let i = 5; i > 0; i--) {
            const gradient = ctx.createRadialGradient(
                sun.x, sun.y, sun.radius * 0.5,
                sun.x, sun.y, sun.radius * 2 * i * 0.5
            );

            const opacity = (sun.glowIntensity * 0.2) / i;
            
            gradient.addColorStop(0, `rgba(255, 235, 150, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 200, 100, ${opacity * 0.6})`);
            gradient.addColorStop(1, 'rgba(255, 180, 80, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius * 2 * i * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

       
        const sunGradient = ctx.createRadialGradient(
            sun.x, sun.y, 0,
            sun.x, sun.y, sun.radius
        );
        
        sunGradient.addColorStop(0, '#fffef0');
        sunGradient.addColorStop(0.4, '#ffeb99');
        sunGradient.addColorStop(1, '#ffd966');

        ctx.fillStyle = sunGradient;
        ctx.shadowBlur = 30 * sun.glowIntensity;
        ctx.shadowColor = 'rgba(255, 220, 100, 0.8)';
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        
        ctx.strokeStyle = `rgba(255, 220, 100, ${sun.glowIntensity * 0.7})`;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            const rayLength = 15 + sun.glowIntensity * 15;
            const startX = sun.x + Math.cos(angle) * (sun.radius + 5);
            const startY = sun.y + Math.sin(angle) * (sun.radius + 5);
            const endX = sun.x + Math.cos(angle) * (sun.radius + rayLength);
            const endY = sun.y + Math.sin(angle) * (sun.radius + rayLength);

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

function startCloudyAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId); 
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'weather-animation-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    class Cloud {
        constructor(x, y, scale, opacity, speedX) {
            this.x = x;
            this.y = y;
            this.scale = scale;
            this.opacity = opacity;
            this.speedX = speedX;
            this.alive = true;
        }
    }

    const config = {
        cloudCount: 15,
        minScale: 0.5,
        maxScale: 1.5,
        minOpacity: 0.3,
        maxOpacity: 0.7,
        minSpeedX: 0.2,
        maxSpeedX: 1.0
    };

    const clouds = [];
    const randNumber = (min, max) => Math.random() * (max - min) + min;

    const drawCloudShape = (x, y, w, h, opacity) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#ffffff';
        ctx.filter = 'blur(4px)';
        
        ctx.beginPath();
        ctx.arc(x + w * 0.25, y + h * 0.5, w * 0.2, 0, Math.PI * 2);
        ctx.arc(x + w * 0.45, y + h * 0.35, w * 0.25, 0, Math.PI * 2);
        ctx.arc(x + w * 0.7, y + h * 0.55, w * 0.22, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    };

    const createCloud = (offscreen = false) => {
        const scale = randNumber(config.minScale, config.maxScale);
        const cloudWidth = 150 * scale;

        let x = offscreen ? -cloudWidth : randNumber(0, canvas.width);
        let y = randNumber(0, canvas.height * 0.5);

        const opacity = randNumber(config.minOpacity, config.maxOpacity);
        const speedX = randNumber(config.minSpeedX, config.maxSpeedX);

        return new Cloud(x, y, scale, opacity, speedX);
    };

    const updateCloud = (cloud) => {
        if (!cloud.alive) return;
        cloud.x += cloud.speedX;
        if (cloud.x > canvas.width + 200) {
            cloud.alive = false;
        }
    };

    const respawnCloud = (index) => {
        if (!clouds[index].alive) {
            clouds[index] = createCloud(true);
        }
    };

    const drawCloud = (cloud) => {
        if (!cloud.alive) return;
        const w = 150 * cloud.scale;
        const h = 75 * cloud.scale;
        drawCloudShape(cloud.x, cloud.y, w, h, cloud.opacity);
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        clouds.forEach((cloud, index) => {
            updateCloud(cloud);
            respawnCloud(index);
            drawCloud(cloud);
        });

        requestAnimationFrame(animate);
    };

    for (let i = 0; i < config.cloudCount; i++) {
        clouds.push(createCloud(false));
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
// Teleport API kullanarak arka plan görselini güncelleyen fonskyionum
async function updateBackgroundImage(city) {
    try {
        const response = await fetch(`https://api.teleport.org/api/cities/?search=${city}`);
        if (!response.ok) throw new Error("Teleport'a ulaşılamıyor");

        const data = await response.json();
        const searchResults = data._embedded['city:search-results'];
        
        if (searchResults && searchResults.length > 0) {
            const cityDetailsUrl = searchResults[0]._links['city:item'].href;
            const detailsRes = await fetch(cityDetailsUrl);
            const detailsData = await detailsRes.json();
            
            if (detailsData._links['city:urban_area']) {
                const uaUrl = detailsData._links['city:urban_area'].href;
                const imgRes = await fetch(`${uaUrl}images/`);
                const imgData = await imgRes.json();
                
                const photoUrl = imgData.photos[0].image.web;
                document.body.style.backgroundImage = `url('${photoUrl}')`;
                return; // Başarılı, fonksiyon biter
            }
        }
        throw new Error("Görsel bulunamadı");
    } catch (err) {
        console.warn("Teleport hatası, yedek arka plana geçiliyor.");
        // GÖRSEL BULUNAMAZSA: Koyu, şık bir gradyan verelim ki yazılar okunsun
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#1a1a1a"; // Çok koyu gri/siyah
        document.body.style.background = "linear-gradient(135deg, #1e1e2f 0%, #121212 100%)";
    }
}