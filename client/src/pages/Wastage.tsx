import React, { useState, useEffect } from "react";
import "../css/FoodListing.css";

const Wastage = () => {
  const [wastages, setWastages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/wastage")
      .then((response) => response.json())
      .then((data) => setWastages(data.data.reward))
      .catch((error) => console.error(error));
  }, []);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>Food Type</th>
          <th>Waste Amount Portion</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {wastages.map((wastage: any) => {
          return (
            <tr key={wastage.reward_id}>
              <td>{wastage.reward_type}</td>
              <td>{wastage.point_needed}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <h1>Wastage</h1>
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Wastage;
