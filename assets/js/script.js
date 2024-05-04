// funções referentes a api e a busca
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const cityName = document.querySelector('#city-name').value;
    
    if (!cityName) {
        document.getElementById('weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade... <img src="./assets/img/air_support.svg">');
        return;
    }

    const apiKey = '3339ce96d9cb5f2d3864cd531af9e97b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            description: json.weather[0].description,
            tempMin: json.main.temp_min,
            tempMax: json.main.temp_max,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    } else {
        document.getElementById('weather').classList.remove('show');

        showAlert(`Não foi possível localizar... <img src="./assets/img/air_support.svg">`);
    }
})

function showInfo(json) {
    showAlert('');

    document.getElementById('weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    document.querySelector('#temp-value').innerHTML = `${parseInt(json.temp)} <sup> c°</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-max').innerHTML = `${json.tempMax} <sup>c°</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin} <sup>c°</sup>`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
    document.querySelector('#umidity').innerHTML = `${json.humidity}%`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

// dark and light mode 

// const modeIcon = document.getElementById('modeIcon');

// document.getElementById('mode').addEventListener('click', () => {
//     if (modeIcon.classList.contains('fa-moon')) {
//         modeIcon.classList.remove('fa-moon');
//         modeIcon.classList.add('fa-sun');
//     } else {
//         modeIcon.classList.remove('fa-sun');
//         modeIcon.classList.add('fa-moon');
//     }
// })