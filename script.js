const weatherCard = document.getElementById("weatherCard");
const info = document.getElementById("info");
const place = document.getElementById("place")
const temperatureItem = document.getElementById("temperature")
const wind = document.getElementById("wind")
const forecast = document.getElementById("forecast")


async function loadWeather() {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json")
    const obj = await res.json()
    const { latitude, longitude, city, country } = obj
    console.log(latitude, longitude, city)

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,)
    const data = await response.json()
    const { current_weather } = data
    console.log(current_weather)
    const { windspeed, winddirection, weathercode, temperature } = current_weather
    
    forecast.textContent = getWeatherDesc(weathercode)
    info.textContent = "Our forecast is: "
    
    place.textContent = `${city}, ${country}`
    temperatureItem.textContent = 
        temperature + " " + data.current_weather_units.temperature
    wind.textContent = windspeed + " " + data.current_weather_units.windspeed

    function getWeatherDesc(code) {
        switch (code) {
            case 0: 
                return "Clear sky*"
        }
    }
}
loadWeather()