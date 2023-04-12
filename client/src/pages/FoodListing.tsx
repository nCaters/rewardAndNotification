import React, { useState, useEffect } from 'react';
import './FoodListing.css';

const FoodListing = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/food')
      .then(response => response.json())
      .then(data => setRestaurants(data.data.food))
      .catch(error => console.error(error));
  }, []);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Cuisine</th>
          <th>Meal</th>
          <th>Cost</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {restaurants.map((restaurant: any) => {
          return (
            <tr key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.meal}</td>
              <td>{restaurant.cost}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <h1>Food</h1>
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default FoodListing;
