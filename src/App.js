import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  'weather-icons/css/weather-icons.css';


import Weather from './Component/Weather.Component.jsx';

import Form from './Component/Form.Component.js';


import './App.css';
const API_KEY = "415e2cbc6a6ec76e6e9b7eb8e628eb60";
class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country: undefined,
      icon:undefined,
      temp_max:undefined,
      temp_min:undefined,
      celsius:undefined,
      main:undefined,
      description:"",
      error: false
    };

    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }
  calcelsius(temp){
    const cell=Math.floor (temp-273.15);
    return cell;
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  getWeather=async(e)=>{

    e.preventDefault();
  

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    if (country && city) {

    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const response =await api_call.json();
    console.log(response);
    this.setState({
      
      city: `${response.name}, ${response.sys.country}`,
      country:response.sys.country,
      celsius:this.calcelsius(response.main.temp),

      temp_min:this.calcelsius(response.main.temp_min),
      temp_max:this.calcelsius(response.main.temp_max),
      description:response.weather[0].description,
      error: false
      

    });
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id); }
    else {
      this.setState({
        error: true
      });
    }
 


  };
 
  render(){
  return(
    <div className="App">
       <Form loadweather={this.getWeather}error={this.state.error}/>

    <Weather
    city={this.state.city}
    country={this.state.country}
   temp_celsius={this.state.celsius}
    temp_max={this.state.temp_max}
    temp_min={this.state.temp_min}
    description={this.state.description}
    weatherIcon={this.state.icon}

    />
   

  </div>
  );
  }
}



export default App;
