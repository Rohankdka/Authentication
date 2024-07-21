import React, { useState } from 'react';

const Blog = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [blogPost, setBlogPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = function (e) {
      const newBlogPost = {
        title,
        description,
        photo: e.target.result,
      };

      setBlogPost(newBlogPost);
      setTitle('');
      setDescription('');
      setPhoto(null);
    };

    if (photo) {
      reader.readAsDataURL(photo);
    } else {
      setBlogPost({ title, description, photo: null });
    }

    setIsFormVisible(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsFormVisible(true);
    setIsEditing(true);
    setTitle(blogPost.title);
    setDescription(blogPost.description);
    setPhoto(null);
  };

  const handleDeleteClick = () => {
    setBlogPost(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isEditing ? 'Edit Blog' : 'Create Blog'}
      </button>

      {isFormVisible && (
        <div className="mt-6">
          <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-gray-700">
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="mt-1 block w-full border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      )}

      {blogPost && (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">{blogPost.title}</h2>
          {blogPost.photo && (
            <img src={blogPost.photo} alt="Blog Post" className="w-full h-auto mb-4 rounded" />
          )}
          <p className="text-gray-700">{blogPost.description}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
