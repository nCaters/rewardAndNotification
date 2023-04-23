import React, { useEffect, useState } from 'react';
import '../css/FoodPreference.css';
import moment from 'moment';


const FoodPreference = () => {
  const [mealSelected, setMealSelected] = useState({} as any);
  const [selectedTable, setSelectedTable] = useState('Breakfast');
  const [mealList, setMealList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [allTableData, setAllTableData] = useState({} as any)
  const [tableData, setTableData] = useState([])

  const [selectedOption, setSelectedOption] = useState('')

  //login token
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }

    console.log("token: " + token);

    fetch('http://localhost:3002/api/v1/meal')
      .then(response => response.json())
      .then(data => setMealList(data.data))
      .catch(error => console.error(error));


    fetch('http://localhost:3002/api/v1/food')
      .then(response => response.json())
      .then(data => {
        const foodData = data.data.food;
        const breakfast = retrieveFoodDataByMeal(foodData, "Breakfast")
        const lunch = retrieveFoodDataByMeal(foodData, "Lunch")
        const dinner = retrieveFoodDataByMeal(foodData, "Dinner")
        setTableData(breakfast)
        setAllTableData({
          breakfast,
          lunch,
          dinner
        })
      })
      .catch(error => console.error(error));
  }, []);



  function retrieveFoodDataByMeal(foodData: any, mealType: string) {
    return foodData.filter((item: any) => {
      if (item.meal === mealType) {
        return item;
      }
    })
  }

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
    if (tableSelected === "Breakfast") {
      setTableData(allTableData.breakfast)
      setSelectedOption(mealSelected.Breakfast)
    } else if (tableSelected === "Lunch") {
      setTableData(allTableData.lunch)
      setSelectedOption(mealSelected.Lunch)

    }
    else {
      setTableData(allTableData.dinner)
      setSelectedOption(mealSelected.Dinner)

    }
    setSelectedTable(event.target.value);
    setSubmitted(false)
  };


console.log("selectedOption")
console.log(selectedOption)
  return (
    <>
      <h1>Meal Preference for:</h1>
      <h2>{moment().add(1, 'days').format("DD MMM YYYY")}</h2>
      <div>
        <label>Indicate your meal preference for tomorrow: </label>
        <select value={selectedTable} onChange={handleTableChange} className='select-element'>
          {mealList?.map((item: any) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="radio-table">
          <thead>
            <tr key='1'>
              <th>Index</th>
              <th>Cuisine</th>
              <th>Food</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any, index: number) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.cuisine}</td>
                <td>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value={item.name}
                      checked={selectedOption === item.name}
                      onChange={handleOptionChange}
                      />
                    <span className="radio-custom"></span>
                    {item.name}
                  </label>
                </td>
                <td>${item.cost}</td>
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
