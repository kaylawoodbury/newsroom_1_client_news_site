import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { articles } from "../modules/articles"

const style = {
  width: "75%",
  height: "75%",
  borderRadius: "10px",
  left: "12%"
};

class MapContainer extends Component {
  state = {
    articles: [],
    showingInfoWindow: false,
  }

  render() {
    let articlesData = this.state.articles
    return (
      <Map
        google={this.props.google}
        zoom={3}
        style={style}
        initialCenter={{
          lat: 57.7089,
          lng: 11.9746
        }}
      >
        {articlesData.map(article => {
          return (
            <Marker
              title={article.title}
              lead={article.lead}
              country={article.country}
              onClick={this.onMarkerClick}
            />
          );
        })}

        <InfoWindow>
          <div></div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
