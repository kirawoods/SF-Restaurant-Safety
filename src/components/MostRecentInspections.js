import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { restaurant_data } from "../sf-restaurant-data";
import * as moment from "moment";
import "./MostRecentInspections.css";

const sortedRestaurantData = restaurant_data.sort((a, b) =>
  a.inspection_date < b.inspection_date ? 1 : -1
);

const mostRecentRestaurants = sortedRestaurantData.slice(0, 33);

const lowRiskColor = { backgroundColor: "#90CCF4" };
const moderateRiskColor = { backgroundColor: "#F3D250" };
const highRiskColor = { backgroundColor: "#F78888" };

let cardColor = lowRiskColor;

function riskIndicator(restData) {
  if (restData.risk_category === undefined) {
    cardColor = lowRiskColor;
  } else if (restData.risk_category.toLowerCase() === "moderate risk") {
    cardColor = moderateRiskColor;
  } else if (restData.risk_category.toLowerCase() === "high risk") {
    cardColor = highRiskColor;
  } else {
    cardColor = lowRiskColor;
  }
}

class MostRecentInspections extends Component {
  renderRestaurant(restaurant) {
    riskIndicator(restaurant);
    return (
      <Card
        style={cardColor}
        className="restaurant-card"
        key={restaurant.inspection_id}
      >
        <h1>{restaurant.business_name}</h1>

        <p>
          {restaurant.business_address}, {restaurant.business_city},{" "}
          {restaurant.business_state}, {restaurant.business_postal_code}
        </p>

        <p>
          Inspection Date:{" "}
          {moment(restaurant.inspection_date).format("MMM Do[,] YYYY")}
        </p>

        <p>{restaurant.risk_category}</p>
      </Card>
    );
  }
  render() {
    return (
      <div className="restaurant-info">
        {mostRecentRestaurants.map(this.renderRestaurant)}
      </div>
    );
  }
}

export default MostRecentInspections;
