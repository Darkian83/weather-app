import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [Weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [image, setImage] = useState();

  // Ese useEffect se ejecuta en cuanto se renderiza el componente en la aplicación.
  useEffect(() => {
    const success = (position) => {
      // console.log(position);
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setCoords(obj);
    };

    navigator.geolocation.getCurrentPosition(success);
    // arreglo de dependencias
    // Si el arreglo está vacio, el useEffect se ejecuta una sola vez
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "26411d8afa6a5b99120d428680357dcd";
      // Este codigo se ejecuta cuando coords cambia
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: (
              ((res.data.main.temp - 273.15) * 9) / 5 +
              32
            ).toFixed(1),
          };
          setTemp(obj);
        })
        .catch((err) => console.log(err));
    }
    // arreglo de dependencias
    // Se ejecuta cada vez que coords cambia
  }, [coords]);

  useEffect(() => {
    if (Weather) {
      const ApiKey = "39164413-6de1865a60e1f0fb6b70c921a";
      const url = `https://pixabay.com/api/?key=${ApiKey}&q=${Weather?.weather[0]?.description}`;
      axios
        .get(url)
        .then((res) => {
          // console.log(res);
          const random = Math.floor(
            Math.random() * res?.data?.hits?.length
          );
          setImage(res?.data.hits[random]);
        })
        .catch((err) => console.log(err));
      // console.log(Weather, image);
    }
  }, [Weather]);

  useEffect(() => {
    // console.log(image);
  }, [image]);

  return (
    <>
      {image ? (
        <div
          className="App"
          style={{
            height: "100vh",
            backgroundImage: `url(${image?.largeImageURL})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WeatherCard weather={Weather} temp={temp} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
