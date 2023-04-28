import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Weather from "./pages/weather";


function App() {



  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const apikey = "9c4e5bebac3febfd0a55eb29f150b2ec"; // replace with your OpenWeather API key
    const city = "Nijmegen"; // replace with the city you want to display the weather for
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData({
          weather: data.weather[0].description,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
        });
      })
      .catch(error => console.log(error));
  }, []);

  const { weather, temperature, feelsLike, humidity } = weatherData;
  const weather_use = `The weather in Nijmegen is currently ${weather}.`;
  const temperature_use = `The temperature is ${temperature}°C, but it feels like ${feelsLike}°C.`;
  const humidity_use = `The humidity is ${humidity}%.`;
  const list = "<li>" + weather_use + "</li> <li>" + temperature_use + "</li> <li>" + humidity_use + "</li>";
  return (
    <body>
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li><Link to="/Weather">weather</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        
          <Routes>
            <Route path="/Weather" element={<Weather />} />
          </Routes>
        
        <section>
          <h2>About Us</h2>
          <p></p>
        </section>
        <section>
          <h2>Our Services</h2>
          <ul id="weather" dangerouslySetInnerHTML={{ __html: list }}></ul>
        </section>
        
      </main>
      <footer>
        <p>Copyright © My Website 2023</p>
      </footer>
    </body>
  );
}

export default App;
