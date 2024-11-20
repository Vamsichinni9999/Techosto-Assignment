import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importing axios
import { Row, Col } from 'antd';
import ProfileCard from './Components/ProfileCard';
import Loader from './Components/Loader';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Defaulting loading to true
  const [error, setError] = useState(null); // To handle any error

  useEffect(() => {
    axios
      .get('https://techosto-assignment-task.onrender.com/api/get-user-details')
      .then((response) => {
        setUsers(response.data); // Set users data from the response
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError('Error fetching user details.'); // Set error state if there's an issue
        setLoading(false); // Set loading to false if an error occurs
        console.error('Error fetching user details:', err); // Log error
      });
  }, []);

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error if something went wrong
  }

  return (
    <div>
      <Row gutter={[16, 16]}> {/* Add gutter for spacing between cards */}
        {users.map((user) => (
          <Col key={user._id} xs={24} sm={12} lg={6}>
            <ProfileCard user={user} setUsers={setUsers} /> {/* Display each user's profile */}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
