import moment from "moment";
import { useRef, useState } from "react";
import "../css/Notification.css";

const Notification = () => {

    const [notificationList, setNotificationList] = useState([]);
    const [showNotificationList, setShowNotificationList] = useState(false);
    const [showAddNotification, setShowAddNotification] = useState(false);
    const newNotification = useRef({
        message: '',
        date: ''
    });

    //login token
    const storedToken = localStorage.getItem('token');

    const handleAdd = async (event: any) => {
        event.preventDefault();
        const reqBody = { ...newNotification.current }
        const response = await fetch('http://localhost:3003/api/v1/add_Notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${storedToken}`,
            },
            body: JSON.stringify(reqBody),
        })
        const data = await response.json();
        if (data.status === "fail") {
            alert(data.data.Error);
        } else {
            alert("You have successfully added a new notification");
        }
    }

    const retrieveUpcomingNotifications = async () => {
        const response = await fetch('http://localhost:3003/api/v1/get_Upcoming_Notifications');
        const data = await response.json();
        if (data.status === "fail") {
            alert(data.data.Error);
        } else {
            setNotificationList(data.data.notifications);
            setShowNotificationList(!showNotificationList);
        }
    }

    const handleDelete = async (id: number) => {
        const reqbody = { id: id }
        const response = await fetch('http://localhost:3003/api/v1/delete_Notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${storedToken}`,
            },
            body: JSON.stringify(reqbody),
        })
        const data = await response.json();
        if (data.status === "fail") {
            alert(data.data.Error);
        } else {
            alert("Notification has been successfully deleted");
        }
    }

    return (
        <>
            <h1 className='h1'>Manage Notifications</h1>
            <div className="buttons">
                <button className="action_buttons" onClick={() => {
                    retrieveUpcomingNotifications();
                }}>{showNotificationList ? 'Hide' : 'Show'} All Notifications</button>
                <button className="action_buttons" onClick={() => {
                    setShowAddNotification(!showAddNotification)
                }}>Add Notification</button>
            </div>
            {showAddNotification &&
                <form className="form" onSubmit={handleAdd}>
                    <h3 className="h3">Add Notification: </h3>
                    <input
                        type={'text'}
                        onChange={(e: any) => {
                            newNotification.current.message = e.target.value
                        }}
                    >
                    </input>
                    <input
                        type="date"
                        onChange={(e: any) => {
                            newNotification.current.date = e.target.value
                        }}
                    >
                    </input>
                    <button>Add</button>
                </form>
            }
            {showNotificationList &&
                <>
                    <h3 className='h3'>All upcoming notifications:</h3>

                    <table className='radio-table'>
                        <thead>
                            <tr key='1'>
                                <th>Date</th>
                                <th>Messages</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationList?.map((item: any, index: number) => (
                                <tr key={item.notification_id}>
                                    <td>{moment(item.date).format('YYYY-MM-DD')}</td>
                                    <td>{item.message}</td>
                                    <td><button onClick={() => { handleDelete(item.notification_id) }}>delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }

        </>
    );
};

export default Notification;
