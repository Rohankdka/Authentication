import React, { useState, useEffect } from 'react';
import './Blog.css';
import axios from 'axios';

const Blog = () => {

  const token = localStorage.getItem('token');
  if (!token) return <h1>Please login</h1>

  
  const [formVisible, setFormVisible] = useState(null); // Use null to indicate no form is visible
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    photo: null
  });

  useEffect(() => {
    axios.get("http://localhost:5000/read", { withCredentials: true })
      .then((res) => {
        setData(res.data.result);
      }).catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/${id}`, { withCredentials: true })
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
    setFormVisible('edit');
  };

  const handleAddClick = () => {
    setFormVisible('add');
  };

  const handleCancel = () => {
    setFormVisible(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'photo') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    if (formData.photo) {
      formDataObj.append('photo', formData.photo);
    }

    axios.put(`http://localhost:5000/${formData.id}`, formDataObj, { withCredentials: true })
      .then((res) => {
        setFlag(flag + 1);
        setFormVisible(null);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    axios.post('http://localhost:5000/', formDataObj, { withCredentials: true })
      .then((res) => {
        setFlag(flag + 1);
        setFormVisible(null);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <h1>POSTS</h1>
      <button className='add' onClick={handleAddClick}>Add</button>
      <div className='card-item'>
        {data.map((value) => (
          <div className="card" key={value.id}>
            <h1>{value.title}</h1>
            {value.photo && <img src={`http://localhost:5000${value.photo}`} alt="post" />}
            <p>{value.description}</p>
            <div className="btn">
              <button onClick={() => handleDelete(value.id)}>Delete</button>
              <button onClick={() => handleEdit(value)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {formVisible === 'edit' && (
        <div className='form-container'>
          <div className='form-wrapper'>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <label htmlFor='title'>Title: </label>
              <input type='text' name='title' value={formData.title} onChange={handleChange} />
              <label htmlFor='description'>Description: </label>
              <textarea name='description' value={formData.description} onChange={handleChange}></textarea>
              <label htmlFor='photo'>Photo: </label>
              <input type='file' name='photo' accept='image/*' onChange={handleChange} />
              <div className='form-buttons'>
                <button type='button' onClick={handleCancel}>Cancel</button>
                <button type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {formVisible === 'add' && (
        <div className='form-container'>
          <div className='form-wrapper'>
            <form onSubmit={handleAddSubmit} encType='multipart/form-data'>
              <label htmlFor='title'>Title: </label>
              <input type='text' name='title' required />
              <label htmlFor='description'>Description: </label>
              <textarea name='description' required></textarea>
              <label htmlFor='photo'>Photo: </label>
              <input type='file' name='photo' accept='image/*' />
              <div className='form-buttons'>
                <button type='button' onClick={handleCancel}>Cancel</button>
                <button type='submit'>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
