import React from "react";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "現在地", description: "きょうの天気について説明します", icon: ""};
  }

  handleClick = () => {
    // 現在地の緯度経度を取得（GoogleMap: Javascript API）
    function mapSuccess(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // 緯度経度が取得できた場合は、市区町村名を取得（GoogleMap: Geocoding API）
      axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyATHkVtCki6nWBWZlQNK4fOd-uFp2dkJ2g"
      )
      .then((response) => {
        let results = response.data.results[0].address_components.filter(function(component) {
          return component.types.indexOf("locality") > -1;
        }); // 市区町村は"locality"
        let cityName = results[0].long_name;
        // this.setState({location: cityName});
        console.log(cityName);
      })
      .catch((error) => {
        alert(error);
      });

      // 緯度経度が取得できた場合は、本日の天気情報を取得（OpenWeather API）
      axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=ac86a7c7f7e307421b5975639d34002d"
      )
      .then((response) => {
        let description = response.data.weather[0].description
        let icon = response.data.weather[0].icon + "@2x.png"
        console.log(description, icon)
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

  render() {
    return (
      <>
        <button onClick={this.handleClick}>かくにんする</button>
        <p>{this.state.location}の天気</p>
        <p>{this.state.description}</p>
        <div><img src={this.state.icon} /></div>
      </>
    );
  }
}

export default Weather;
