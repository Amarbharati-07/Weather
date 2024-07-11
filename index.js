document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e386e114cfd5406f97a150914241906'; // Replace with your WeatherAPI.com API key
    const searchButton = document.getElementById('search');
    const locationInput = document.getElementById('locationInput');
    const cityName = document.getElementById('cityName');
    const dateElement = document.getElementById('date');
    const weatherDescription = document.getElementById('weatherDescription');
    const windSpeed = document.getElementById('windSpeed');
    const humidity = document.getElementById('humidity');
    const visibility = document.getElementById('visibility');

    // Function to fetch weather data based on location
    function fetchWeatherData(location) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
            .then(response => response.json())
            .then(data => {
                // Update UI with fetched data
                updateUI(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please try again.');
            });
    }

    // Function to update UI with weather data
    function updateUI(data) {
        cityName.textContent = data.location.name;
        const currentDate = new Date();
        dateElement.textContent = currentDate.toDateString();
        weatherDescription.innerHTML = `<ion-icon name="cloudy"></ion-icon> ${data.current.condition.text}`;
        windSpeed.textContent = `${data.current.wind_kph} Km/h`;
        humidity.textContent = `${data.current.humidity}%`;
        visibility.textContent = `${data.current.vis_km} Km`;
    }

    // Event listener for search button click
    searchButton.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        } else {
            alert('Please enter a location.');
        }
    });

    // Fetch weather data based on user's current location
    function fetchWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const location = `${latitude},${longitude}`;

                fetchWeatherData(location);
            }, error => {
                console.error('Error getting location:', error);
                alert('Failed to get your location. Please enter a location manually.');
            });
        } else {
            alert('Geolocation is not supported by your browser. Please enter a location manually.');
        }
    }

    // Call fetchWeatherByGeolocation when DOM is loaded to get weather for current location
    fetchWeatherByGeolocation();
});
