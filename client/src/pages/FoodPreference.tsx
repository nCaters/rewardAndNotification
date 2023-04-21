import React, { useState } from 'react';
import '../css/FoodPreference.css';
import moment from 'moment';

const table1Data = [
  { id: 1, option: 'Option 1' },
  { id: 2, option: 'Option 2' },
];

const table2Data = [
  { id: 1, option: 'Option A' },
  { id: 2, option: 'Option B' },
];

const FoodPreference = () => {
  const [selectedOption1, setSelectedOption1] = useState({} as any);
  const [selectedOption2, setSelectedOption2] = useState({} as any);
  const [selectedTable, setSelectedTable] = useState('Breakfast');
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (event: any) => {
    if (selectedTable === 'Breakfast') {
      setSelectedOption1({
        meal: selectedTable,
        selected: event.target.value
      });
    } else if (selectedTable === 'Lunch') {
      setSelectedOption2({
        meal: selectedTable,
        selected: event.target.value
      });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Selected Option:');
    console.log(selectedOption1);
    console.log(selectedOption2);
    setSubmitted(true);
  };

  const handleTableChange = (event: any) => {
    setSelectedTable(event.target.value);
  };

  let tableData, selectedOption: any;
  if (selectedTable === 'Breakfast') {
    tableData = table1Data;
    selectedOption = selectedOption1.selected;
  } else if (selectedTable === 'Lunch') {
    tableData = table2Data;
    selectedOption = selectedOption2.selected;
  }

  return (
    <>
      <h1>Preference</h1>
      <h2>{moment().format("DD MMM YYYY")}</h2>
      <h2>Food of the day</h2>
      <div>
        <label>Indicate your meal preference: </label>
        <select value={selectedTable} onChange={handleTableChange} className='select-element'>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="radio-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value={item.option}
                      checked={selectedOption === item.option}
                      onChange={handleOptionChange}
                    />
                    <span className="radio-custom"></span>
                    {item.option}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <>
          {/* <p>Selected Option for {selectedTable}: {selectedOption1}</p> */}
          {/* <p>Selected Option for {selectedTable}, {selectedOption2}</p> */}
        </>
      )}
    </>
  );
};

export default FoodPreference;
