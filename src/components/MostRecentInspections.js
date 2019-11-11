import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { restaurant_data } from "../sf-restaurant-data";
import * as moment from "moment";
import "./InspectionCards.css";

const sortedRestaurantData = restaurant_data.sort((a, b) =>
  a.inspection_date < b.inspection_date ? 1 : -1
);

const mostRecentRestaurants = sortedRestaurantData.slice(0, 33);
export let riskClass = "low-risk";
export function riskIndicator(restData) {
  if (restData.risk_category === undefined) {
    riskClass = "low-risk";
  } else if (restData.risk_category.toLowerCase() === "moderate risk") {
    riskClass = "moderate-risk";
  } else if (restData.risk_category.toLowerCase() === "high risk") {
    riskClass = "high-risk";
  } else {
    riskClass = "low-risk";
  }
}
export let inspectionKey = "";
export function keyMaker(restData) {
  if (restData.violation_id === undefined) {
    inspectionKey = restData.inspection_id;
  } else {
    inspectionKey = restData.violation_id;
  }
}

class MostRecentInspections extends Component {
  renderRestaurant(restaurant) {
    riskIndicator(restaurant);
    keyMaker(restaurant);
    return (
      <Card className={"restaurant-card " + riskClass} key={inspectionKey}>
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
