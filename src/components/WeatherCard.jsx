import { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  // console.log(weather);

  const [isCelsius, setIsCelsius] = useState(true);

  const handleChangeTemp = () => setIsCelsius(!isCelsius);

  return (
    <article className="MainContainer">
      <h1 className="Title">Weather App</h1>
      <h2 className="Location">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <div className="content">
        <div className="ImageIconContainer">
          <img
            className="ImageIcon"
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
            }
            alt=""
          />
        </div>
        <section className="InfoContainer">
          <h3 className="Description">
            "{weather?.weather[0].description}"
          </h3>
          <p className="listItem WindSpeed">
            <span>Wind Speed</span>
            <span>{weather?.wind.speed} m/s</span>
          </p>
          <p className="listItem Clouds">
            <span>Clouds</span>
            <span>{weather?.clouds.all} %</span>
          </p>
          <p className="listItem Pressure">
            <span>Pressure</span>
            <span>{weather?.main.pressure} hPa</span>
          </p>
        </section>
      </div>
      <h2 className="Temperature">
        {isCelsius ? `${temp?.celsius} °C ` : `${temp?.farenheit} °F`}
      </h2>
      <div className="ButtonContainer">
        <button className="Button" onClick={handleChangeTemp}>
          {isCelsius ? "Change to °F" : "Change to °C"}
        </button>
      </div>
    </article>
  );
};

export default WeatherCard;
