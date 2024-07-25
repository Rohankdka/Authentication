import React, { useState, useEffect } from 'react';
import './Blog.css'
import axios from 'axios';

const Blog = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    axios.get("http://localhost:5000/read",{withCredentials:true})
      .then((res) => {
        setData(res.data.result);
      }).catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios.delete(`http://localhost:5000/${id}`,{withCredentials:true})
        .then((res) => {
          setFlag(flag + 1);
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (card) => {
    setFormData(card);
    setFormVisible(true); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/${formData.id}`, formData,{withCredentials:true}) // Ensure /:id is the correct endpoint
      .then((res) => {
        setFlag(flag + 1);
        setFormVisible(false);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <h1>POSTS</h1>
      <button className='add' onClick={() => setAddVisible(true)}>Add</button>
      <div className='card-item'>
        {data.map((value) => (
          <div className="card" key={value.id}>
            <h1>{value.title}</h1>
            <p>{value.description}</p>
            <div className="btn">
              <button onClick={() => handleDelete(value.id)}>Delete</button>
              <button onClick={() => handleEdit(value)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {formVisible && (
        <div className='edit-form'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='text' name='title' value={formData.title} onChange={handleChange} />
            <label htmlFor='desc'>Desc: </label>
            <textarea name='description' value={formData.description} onChange={handleChange}></textarea>
            <div className='form-buttons'>
              <button type='button' onClick={() => setFormVisible(false)}>Cancel</button>
              <button>Edit</button>
            </div>
          </form>
        </div>
      )}
      {addVisible && (
        <div className='add-form'>
          <form action='http://localhost:5000/' encType='true' method='POST'>
            <label htmlFor='title'>Title: </label>
            <input type='text' name='title' />
            <label htmlFor='desc'>Desc: </label>
            <textarea name='description'></textarea>
            <div className='form-buttons'>
              <button type='button' onClick={() => setAddVisible(false)}>Cancel</button>
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Blog
