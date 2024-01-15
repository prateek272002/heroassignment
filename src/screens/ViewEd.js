import React, { useState } from 'react';
import axios from 'axios';

import './ViewEd.css'; 
import { useNavigate } from 'react-router-dom'
export default function ViewEd(props) {
  const [onlyView, setOnlyView] = useState(true);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  let navigate = useNavigate()
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRegistrationStatusChange = (e) => {
    setRegistrationStatus(e.target.value);
  };

  const handleEnableClick = () => {
    setOnlyView(!onlyView);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/programs/${props.name}`);
      if (response.data.message) {
        alert("Deleted Successfully");
        setOnlyView(false);
        setDescription('');
        setRegistrationStatus('');
        setPrice('');
       props.onChange(false);
        navigate("/");

      } else if (response.data.error) {
        alert("Error in deleting");
      }
    } catch (error) {
      console.error('Error deleting program:', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProgramData = {
      description: description === '' ? props.alldata.find(data => data.name === props.name).description : description,
      price: price === '' ? props.alldata.find(data => data.name === props.name).price : price,
      registrationsStatus: registrationStatus === '' ? props.alldata.find(data => data.name === props.name).registrationsStatus : registrationStatus,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/programs/${props.name}`, updatedProgramData);
      console.log(response.data.message);
      setOnlyView(false);
      setDescription('');
      setRegistrationStatus('');
      setPrice('');
      props.onChange(false);
      navigate("/");
    } catch (error) {
      console.error('Error updating program:', error.message);
    }
  };

  return (
    <div className="view-ed-container">
      <div>Delete and Update option will only be available on enabling edit mode.</div>
      {onlyView && <div className="view-only">VIEW ONLY</div>}
      <button className="toggle-btn" onClick={handleEnableClick}>{onlyView ? "Enable Editing" : "Disable Editing"}</button>
      {!onlyView && <button className="delete-btn" onClick={handleDelete}>Delete</button>}
      {props.alldata.map((data) => {
        return data.name === props.name && (
          <div key={data._id} className="program-details">
            <div className="program-info"><b>Name:</b> {data.name}</div>
            <div className="program-info"><b>Price:</b>{data.price}</div>
            <div className="program-info"><b>Domain:</b> {data.domain}</div>
            <div className="program-info"><b>Placement Assurance:</b> {data.placementAssurance ? "YES" : "NO"}</div>
            <div className="program-info"><b>Program Type:</b> {data.programType}</div>
            <div className="program-info"><b>Registrations Status:</b> {data.registrationsStatus}</div>
            <div className="program-info"><b>Description:</b> {data.description}</div>
            <div className="program-info"><b>University:</b> {data.domain}</div>
             <div className="program-info"><b>FacultyProfile:</b> <a className="faculty-link" href={data.facultyProfile}>Linkedin</a></div>
            <div className="program-info"><b>Duration:</b> {data.learningHours}</div>
            <div className="program-info"><b>Certificate Type:</b> {data.certificateType}</div>
            <div className="program-info"><b>Eligibility Criteria:</b> {data.eligibilityCriteria}</div>
          </div>
        );
      })}

      {!onlyView && (
        <>
          <div className="edit-form">
            <b>Updated Price:</b>
            <input type="text" onChange={handlePriceChange} name="name" value={price} />
            <b>Updated Registration Status:</b>
            <input type="text" onChange={handleRegistrationStatusChange} name="registrationStatus" value={registrationStatus} />
            <b>Updated Description:</b>
            <input type="text" onChange={handleDescriptionChange} name="description" value={description} />
          </div>

          <button className="update-btn" onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
}
