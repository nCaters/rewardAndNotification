import React, { useEffect, useState } from 'react';
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
  const [mealSelected, setMealSelected] = useState({} as any);
  const [selectedTable, setSelectedTable] = useState('Breakfast');
  const [mealList, setMealList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [tableData, setTableData] = useState(table1Data)
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/meal')
      .then(response => response.json())
      .then(data => setMealList(data.data))
      .catch(error => console.error(error));
  }, []);


  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    setMealSelected((prev: any) => {
      return {
        ...prev, ...{
          [selectedTable]: event.target.value
        }
      }
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleTableChange = (event: any) => {
    const tableSelected = event.target.value;
    if (tableSelected === "1") {
      setTableData(table1Data)
    } else if (tableSelected === "2") {
      setTableData(table2Data)
    }
    else {
      setTableData(table2Data)
    }
    setSelectedTable(event.target.value);
    setSubmitted(false)
  };




  return (
    <>
      <h1>Preference</h1>
      <h2>{moment().format("DD MMM YYYY")}</h2>
      <h2>Food of the day</h2>
      <div>
        <label>Indicate your meal preference: </label>
        <select value={selectedTable} onChange={handleTableChange} className='select-element'>
          {mealList?.map((item: any) => (
            <option value={item.name}>{item.name}</option>
          ))}
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
            {tableData?.map((item: any) => (
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
        <table className="radio-table">
          <thead>
            <tr>
              <th>You have selected the options for:</th>
            </tr>
          </thead>
          <tbody>
            <tr key={1}>
              <td>
                <p>Breakfast: {mealSelected.Breakfast}</p>
                <p>Lunch: {mealSelected.Lunch}</p>
                <p>Dinner: {mealSelected.Dinner}</p>
              </td>
            </tr>

          </tbody>
        </table>
      )}
    </>
  );
};

export default FoodPreference;
