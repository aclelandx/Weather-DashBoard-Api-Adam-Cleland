

const $sideNav = document.getElementById(`side-navigation`);

const $searchForm = document.querySelector(`form`);
const $searchButton = document.getElementById(`search-for-a-city`);
const $searchHistoryUl = document.getElementById(`search-history-list`);

const $weatherContentSection = document.getElementById(`weather-content`);

const $currentName = document.getElementById(`city-name`);
const $currentWeather = document.getElementById(`current-weather`);
const $currentWeatherUl = document.getElementById(`current-weather-ul`);
const $currentTemp = $currentWeatherUl.children[0];
const $currentWind = $currentWeatherUl.children[1];
const $currentHumidity = $currentWeatherUl.children[2];
const $currentUVindex = $currentWeatherUl.children[3];

const $forecastCards = document.querySelectorAll(`.forecast-cards`);

let currentLat = ``;
let currentLon = ``;

let searchHistoryArray = [];

$searchForm.children[0].value = `Columbus`

function searchHistoryData() {

}

// function that plays when the information is input into the text field.
function weatherSearch(e) {
    e.preventDefault();
    let currentSearch = $searchForm.children[0].value.trim()
    if (currentSearch === ``) {
        $currentName.textContent = 'That input is invalid.';
        return;
    }

    let openWeatherSearch = 'https://api.openweathermap.org/data/2.5/weather?q=' + currentSearch + '&units=imperial&APPID=4ba263fc479a8029bd0bd9180e26bba2';

    fetch(openWeatherSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentLat = data.coord.lat;
            currentLon = data.coord.lon;
            weatherSearchPt2();
            let curUnixTS = data.dt * 1000;
            $currentName.innerHTML = `${data.name} ${moment(curUnixTS).format(`MMMM Do YYYY`)}`
        })
};

function weatherSearchPt2() {
    let openWeatherSearch = `https://api.openweathermap.org/data/2.5/onecall?lat=` + currentLat + `&lon=` + currentLon + `&exclude=hourly,alerts,minutely&units=imperial&appid=4ba263fc479a8029bd0bd9180e26bba2`;

    fetch(openWeatherSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            weatherForLoop(data);
        })
}

function weatherForLoop(d) {
    for (let i = 1; i <= $forecastCards.length; i++) {
        $forecastCards[i - 1].children[0].innerHTML = `${moment(d.daily[i].dt * 1000).format(`MMM Do YYYY`)}`;
        $forecastCards[i - 1].children[1].setAttribute(`src`, `http://openweathermap.org/img/w/${d.daily[i].weather[0].icon}.png`);
        $forecastCards[i - 1].children[2].innerHTML = `Temp : ${d.daily[i].temp.day}Deg`;
        $forecastCards[i - 1].children[3].innerHTML = `Wind :${d.daily[i].wind_speed}MPH`;
        $forecastCards[i - 1].children[4].innerHTML = `Humidity ${d.daily[i].humidity}%`;
    }
}

$searchButton.addEventListener(`click`, weatherSearch);




        // $currentTemp.innerHTML = `${$currentTemp.getAttribute(`data-current`)} ${data.main.temp}`
        // $currentWind.innerHTML = `${$currentWind.getAttribute(`data-current`)} ${data.main.temp}`
        // $currentHumidity.innerHTML = `${$currentHumidity.getAttribute(`data-current`)} ${data.main.temp}`
        // $currentUVindex.innerHTML = `${$currentUVindex.getAttribute(`data-current`)} ${data.main.temp}`


