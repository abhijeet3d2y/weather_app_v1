import React, { useState } from 'react';
import axios from 'axios';
// importing images
import clearSkyImage from '../images/clear-sky.jpeg';
import rainImage from '../images/rain.jpg';
import snowImage from '../images/snow.jpeg';
import fewCloudsImage from '../images/few-clouds.jpeg';
import scatteredCloudsImage from '../images/scattered-clouds.jpg';
import brokenCloudsImage from '../images/broken-cloud.jpg';
import overcastCloudsImage from '../images/overcast-clouds.jpeg';
import thunderstormImage from '../images/thunderstorm.jpeg';
import mistImage from '../images/mist.jpg';
import hazeImage from '../images/haze.jpg';
import fogImage from '../images/fog.jpg';
import smokeImage from '../images/smoke.jpg';
import dustImage from '../images/dust.jpg';
import sandImage from '../images/sand.jpg';
import tornadoImage from '../images/tornado.jpg';
import hurricaneImage from '../images/hurricane.jpg';
import extremeColdImage from '../images/extreme-cold.jpg';
import extremeHeatImage from '../images/extreme-heat.jpeg';

const WeatherPage = () => {
    const [formData, setFormData] = useState({
        city: '',
    });

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.city) {
            setError('Please enter a city name.');
            setWeatherData(null);
            return;
        }

        try {
            setLoading(true);
            const response = await fetchWeatherData(formData.city);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            console.error('Failed to retrieve weather data:', error);
            setWeatherData(null);
            setError('Unable to retrieve weather data. Please check the city name or try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherData = async (city) => {
        const apiKey = '69db99dbc20ea9c7211d8ccb93327ab2';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        return axios.get(url).catch((error) => {
            throw error;
        });
    };

    const getBackgroundImage = (weatherCondition) => {
        console.log('Weather Condition:', weatherCondition)
        // Map weather conditions to corresponding image file names
        const conditionToImage = {
            'clear sky': clearSkyImage,
            'rain': rainImage,
            'snow': snowImage,
            'few clouds': fewCloudsImage,
            'scattered clouds': scatteredCloudsImage,
            'broken clouds': brokenCloudsImage,
            'overcast clouds': overcastCloudsImage,
            'thunderstorm': thunderstormImage,
            'mist': mistImage,
            'haze': hazeImage,
            'fog': fogImage,
            'smoke': smokeImage,
            'dust': dustImage,
            'sand': sandImage,
            'tornado': tornadoImage,
            'hurricane': hurricaneImage,
            'extreme cold': extremeColdImage,
            'extreme heat': extremeHeatImage,
        };

        const imageName = conditionToImage[weatherCondition];
        console.log('Image Name:', imageName);
        
        if (imageName) {
            return `url(${imageName})`;
        }

        // Default background if no match found
        return `url(${clearSkyImage})`;
    };

    return (
        <div
            style={{
                background: weatherData
                    ? getBackgroundImage(weatherData.weather[0].description)
                    : `url(${clearSkyImage})`,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h1>Weather Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="city">Enter City:</label>
                        <input
                            value={formData.city}
                            onChange={handleChange}
                            name="city"
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Enter city"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Get Weather
                    </button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    {loading && <p>Loading...</p>}
                    {error && <div className="error">{error}</div>}
                </div>
            </div>

            {weatherData && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Conditions: {weatherData.weather[0].description}</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;
