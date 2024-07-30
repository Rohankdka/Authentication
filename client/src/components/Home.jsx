import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((res) => {
        setData(res.data.result);
      }).catch((err) => {
        console.log(err);
      });
  }, [flag]);

  return (
    <div className="home-container">
      {user.username ? (
        <>
          <h1 className="welcome-message">Welcome, {user.username}!</h1>
          <div className="post-list">
            {data.map((item) => (
              <div key={item.id} className="post-card">
                {item.photo && <img src={`http://localhost:5000${item.photo}`} alt={item.title} className="post-image" />}
                <h2 className="post-title">{item.title}</h2>
                <p className="post-description">{item.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 className="welcome-message">Welcome to our website!</h1>
      )}
    </div>
  );
};

export default Home;
