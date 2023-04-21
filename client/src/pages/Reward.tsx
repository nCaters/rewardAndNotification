import React, { useState, useEffect } from 'react';
import './FoodListing.css';

const Reward = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/reward')
      .then(response => response.json())
      .then(data => setRewards(data.data.reward))
      .catch(error => console.error(error));
  }, []);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Reward Type</th>
          <th>Points Needed</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {rewards.map((reward: any) => {
          return (
            <tr key={reward.reward_id}>
              <td>{reward.reward_type}</td>
              <td>{reward.point_needed}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <h1>Rewards</h1>
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Reward;
