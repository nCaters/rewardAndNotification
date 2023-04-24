import React, { useEffect, useState } from 'react';
import '../css/FoodPreference.css';
import moment from 'moment';


const FoodPreference = () => {

  interface IRequestBody {
    username: string;
    meal_id: number;
    food_id: number;
  }
  const [userName, setUserName] = useState('');
  const [mealSelected, setMealSelected] = useState({} as any);
  const [selectedTable, setSelectedTable] = useState('Breakfast');
  const [mealList, setMealList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [allTableData, setAllTableData] = useState({} as any)
  const [tableData, setTableData] = useState([])

  const [selectedOption, setSelectedOption] = useState('')

  const [foodData, setFoodData] = useState({} as any);
  const [mealId, setMealId] = useState(1) as any;

  //login token
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    if (storedToken) {
      fetch('http://localhost:3002/api/v1/meal')
        .then(response => response.json())
        .then(data => setMealList(data.data))
        .catch(error => console.error(error));


      fetch('http://localhost:3002/api/v1/food')
        .then(response => response.json())
        .then(data => {
          const foodData = data.data.food;
          setFoodData(foodData);
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
    }
    fetch('http://localhost:3001/dashboard', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'token': `${storedToken}`,
      }
    })
      .then(response => response.json())
      .then(data => setUserName(data.username))
      .catch(error => console.error(error));

  }, [storedToken]);

  function retrieveFoodDataByMeal(foodData: any, mealType: string) {
    return foodData.filter((item: any) => {
      if (item.meal === mealType) {
        return item;
      }
    })
  }

  const handleOptionChange = (event: any) => {
    setSubmitted(false)
    setSelectedOption(event.target.value);
    setMealSelected((prev: any) => {
      return {
        ...prev, ...{
          [selectedTable]: event.target.value
        }
      }
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("meal selected: " + JSON.stringify(mealSelected));
    console.log("food data: " + JSON.stringify(foodData));

    var foodId = getFoodIdByName(selectedOption);
    console.log("foodId: " + foodId);

    const requestBody: IRequestBody = {
      username: userName,
      meal_id: mealId,
      food_id: foodId,
    };

    const response = await fetch('http://localhost:3002/api/v1/preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `${storedToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.status === "fail") {
      alert(data.data.Error);
    } else {
      alert(`You have successfully made your preference for: \n${selectedTable}: ${mealSelected[selectedTable]}`);
    }

    setSubmitted(true);
  };

  const handleTableChange = (event: any) => {
    setSelectedOption("")
    const tableSelected = event.target.value;
    if (tableSelected === "Breakfast") {
      setTableData(allTableData.breakfast)
      setSelectedOption(mealSelected.Breakfast)
      setMealId(1);
    } else if (tableSelected === "Lunch") {
      setTableData(allTableData.lunch)
      setSelectedOption(mealSelected.Lunch)
      setMealId(2);
    }
    else {
      setTableData(allTableData.dinner)
      setSelectedOption(mealSelected.Dinner)
      setMealId(3);
    }
    setSelectedTable(event.target.value);
    setSubmitted(false)
  };



  // Define the function to retrieve the food_id based on the selected food item name
  function getFoodIdByName(selectedFoodName: String) {
    const selectedFoodItem = foodData.find((foodItem: { name: String; }) => foodItem.name === selectedFoodName);
    return selectedFoodItem.food_id;
  }
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
        {selectedOption &&
          <button type="submit">Submit</button>}
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
