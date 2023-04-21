import { useEffect, useState } from "react";
import '../css/Notification.css';


const Home = () => {
    const logo = require('./ncatersicon.PNG');

    const [notification, setNotification] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3003/api/v1/notification')
          .then(response => response.json())
          .then(data => setNotification(data.data.message))
          .catch(error => console.error(error));
      }, []);
    
      const renderData = () => {
        return (
          <body>
            {notification.length > 0 && <h3>Announcements:</h3> }
            {notification.length > 0 && notification.map((item: any) => {
              return (
                  <td>{item.message}</td>
              );
            })}
          </body>
        );
      };

    return (
        <>
            <h1>
                Welcome to nCaterS
            </h1>
            <body id="notification-message">
                {renderData()}
            </body>
            <img src={logo} width="400" height="320"/>
        </>
    );
};

export default Home;