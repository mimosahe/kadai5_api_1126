import React from "react";
import axios from "axios";
import { useState } from "react";

export const Weather = () => {
  const [cityName, setCityName] = useState("現在地");
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);

  const handleClick = () => {
    // 現在地の緯度経度を取得（GoogleMap: Javascript API）
    function mapSuccess(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // 緯度経度が取得できた場合は、市区町村名を取得（GoogleMap: Geocoding API）
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        .then((response) => {
          let results = response.data.results[0].address_components.filter(function (component) {
            return component.types.indexOf("locality") > -1;
          }); // 市区町村は"locality"
          setCityName(results[0].long_name);
        })
        .catch((error) => {
          alert(error);
        });

      // 緯度経度が取得できた場合は、本日の天気情報を取得（OpenWeather API）
      axios
        .get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        .then((response) => {
          let description = response.data.weather[0].description;
          let iconImage = response.data.weather[0].icon + "@2x.png";
          setIcon(iconImage);
          setDescription(description);
        })
        .catch((error) => {
          alert(error);
        });
    }

    function mapFail(error) {
      alert("位置情報の取得に失敗しました。エラーコード：" + error.code);
    }
    navigator.geolocation.getCurrentPosition(mapSuccess, mapFail);
  };

  return (
    <>
      <button onClick={handleClick}>かくにんする</button>
      <p>{cityName}の天気</p>
      <p>{description}</p>
      {icon && (
        <div>
          <img src={`http://openweathermap.org/img/wn/${icon}`} />
        </div>
      )}
    </>
  );
};
