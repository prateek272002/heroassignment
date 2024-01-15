import React,{useState} from 'react'

export default function Delete() {


    const deleteButtonStyle = {
        backgroundColor: '#FF4500',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
      };
      
        const [programName, setProgramName] = useState('');
      
        const handleInputChange = (e) => {
          setProgramName(e.target.value);
        };
      
        const handleDelete = () => {
          // Implement logic to delete the program with the entered name
          console.log(`Deleting program with name: ${programName}`);
          // Add logic to delete the program (e.g., make an API call)
        };
      
  return (
    <>
         <>
      <h1>Delete Program</h1>
      <label>
        <b>Program Name:</b>
        <input type="text" value={programName} onChange={handleInputChange} />
      </label>

      <button onClick={handleDelete} style={deleteButtonStyle}>
        Delete Program
      </button>
    </>
    </>
  )
}
