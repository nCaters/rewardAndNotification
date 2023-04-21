import React, { useState, useEffect } from "react";
import "../css/FoodListing.css";

const Wastage = () => {
  const [wastages, setWastages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/wastage")
      .then((response) => response.json())
      .then((data) => setWastages(data.data.wastage))
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
            <tr key={wastage.id}>
              <td>{wastage.wastedate.slice(0,10)}</td>
              <td>{wastage.foodname}</td>
              <td>{wastage.wasteamount}</td>
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
