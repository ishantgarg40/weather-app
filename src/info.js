import React from "react";
// import axios from "axios";
import "./app.css";

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      city: null,
      country: null,
      weatherInfo: "",
      apiKey: "a8d871ded5067c1a7b1044819914c815"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      city: null,
      country: null,
      weatherInfo: "Enter your City and Country.."
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const city = this.state.city;
    const country = this.state.country;

    if (city !== null && country !== null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.state.apiKey}`)
        .then(response => response.json())
        .then(response => {
          this.setState({
            weatherInfo: response.weather[0].description
          });
        })
        .catch(err => {
          console.log("Error Fetching Data");
        });
      // : this.setState({
      //     weatherInfo: "Incomplete Information Given..."
      //   });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="information">
        <form className="weather-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="City"
            name="city"
            value={this.state.city}
            placeholder="city"
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="Country"
            name="country"
            value={this.state.country}
            placeholder="country"
            onChange={this.handleChange}
          />
          <button className="btn">Get Weather</button>
        </form>
        <div>
          <p className="output">{this.state.weatherInfo.toUpperCase()}</p>
        </div>
      </div>
    );
  }
}

export default Info;
