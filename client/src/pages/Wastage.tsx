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
              <td>{wastage.wastedate.slice(0, 10)}</td>
              <td>{wastage.foodname}</td>
              <td>{wastage.wasteamount}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const [date, setDate] = useState("");
  const [foodWasteAmount, setFoodWasteAmount] = useState("");
  const [foodId, setFoodId] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:3002/api/v1/wasteage-entry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          food_waste_amount: foodWasteAmount,
          food_id: foodId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const wastageForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="foodWasteAmount">Food Waste Amount:</label>
          <input
            type="number"
            id="foodWasteAmount"
            value={foodWasteAmount}
            onChange={(e) => setFoodWasteAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="foodId">Food ID:</label>
          <input
            type="number"
            id="foodId"
            value={foodId}
            onChange={(e) => setFoodId(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  return (
    <>
      <h1>Wastage</h1>
      {wastageForm()}
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Wastage;
