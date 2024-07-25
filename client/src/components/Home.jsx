import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';

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
    <div className="flex flex-col items-center justify-center h-screen">
      {user.username ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <div className="mt-6">
            {data.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4 w-96">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Welcome to our website!</h1>
      )}
    </div>
  );
};

export default Home;
