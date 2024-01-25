import React, { useState } from 'react'

export default function Profile() {
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData;
      formData.append('photo', imageUpload);
      console.log(imageUpload);
    } catch (err) {
      console.log(err);
    }
  }

  const handlePhoto = (e) => {
    setImageUpload(e.target.files[0]);
  };

  return (
    <>
      <div>Profile</div>
      <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto}/>
        <button type="submit">Upload</button>
      </form>
    </div>

    </>
  )
}
