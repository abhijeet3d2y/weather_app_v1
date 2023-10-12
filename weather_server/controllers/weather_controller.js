import https from 'https';
import express from 'express';

const Weather_Api = (req, res) => {
    const city = req.query.city; // Retrieve the city name from the query parameters
    const apiKey = '69db99dbc20ea9c7211d8ccb93327ab2'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log(response.statusCode);

            // Send the data received from the OpenWeather API as a response to the client.
            res.send(data);
        });
    });
};

export default Weather_Api;
