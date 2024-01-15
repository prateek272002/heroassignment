import React ,{useState}from 'react'

export default function Edit() {

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
  };
  
  const labelStyle = {
    margin: '10px 0',
  };
  
  const inputStyle = {
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
  };
  
  const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  const [formData, setFormData] = useState({
    name: '', // Assuming you have a program name as input
    price: '',
    description: '',
    facultyProfile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., update the program data
    console.log(`Updating program ${formData.name} with new data:`, formData);
    // Add logic to update the program data (e.g., make an API call)
  };
  return (
    <>
      
      <h1>Edit Program</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <b>Program Name:</b>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            readOnly
          />
        </label>

        <label style={labelStyle}>
          <b>Price:</b>
          <input type="text" name="price" value={formData.price} onChange={handleChange} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          <b>Description:</b>
          <textarea name="description" value={formData.description} onChange={handleChange} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          <b>Faculty Profile:</b>
          <input
            type="text"
            name="facultyProfile"
            value={formData.facultyProfile}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <button type="submit" style={submitButtonStyle}>
          Save Changes
        </button>
      </form>


    </>
  )
}
