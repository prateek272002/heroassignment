import React,{useEffect, useState} from 'react'
import axios from 'axios';
import ViewEd from './ViewEd';
import Modal from './Modal'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
export default function Add() {
    
        

  let navigate = useNavigate()
        
 
    

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1000px',
       
        margin: 'auto',
      };
      
      const labelStyle = {
        margin: '10px 0',
      };
      
      const inputStyle = {
        padding: '8px',
        width: '80%',
        boxSizing: 'border-box',
        marginBottom: '10px',
        
      };
      
    
  
     
    const[allProgram,setallProgram]=useState([]);
     
    const[viewED,setviewED]=useState(false);
    
    const[viewData,setviewData]=useState("");

    const[searchData,setsearchData]=useState("");
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        domain: '',
        programType: '',
        registrationsStatus: '',
        description: '',
        placementAssurance: false,
        imageUrl: '',
        universityName: '',
        facultyProfile: '',
        learningHours: '',
        
        certificateType: '',
        eligibilityCriteria: '',
      });
      useEffect(() => {
          
      setsearchData(''); 
  }, []);
      useEffect(() => {
          
        axios.get('https://herobackend-xprm.onrender.com/api/programs')
      .then(response => setallProgram(response.data))
      .catch(error => console.error('Error:', error.message));
  }, );


  const handlesetviewED = (newState) => {
    setviewED(newState);
  };
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    

      const handleSubmit = async (e) => {
        if(!localStorage.getItem("token"))
        {
          navigate("/login");
          return;
        }
        e.preventDefault();
      
        console.log(formData);
        
        try {
            const response = await axios.post('https://herobackend-xprm.onrender.com/api/programs', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            alert("Added Successfully");
            setFormData({
              name: '',
              price: '',
              domain: '',
              programType: '',
              registrationsStatus: '',
              description: '',
              placementAssurance: false,
              imageUrl: '',
              universityName: '',
              facultyProfile: '',
              learningHours: '',
              
              certificateType: '',
              eligibilityCriteria: '',
            })
            console.log('Program submitted successfully!', response.data);
            // You can handle the response as needed
          } catch (error) {
            alert(" Error in Adding");
            console.error('Failed to submit program.', error.message);
            // Handle errors
          }
      

      };

      const handleSaveDraft = async (e) => {
        e.preventDefault();
        if(!localStorage.getItem("token"))
        {
          navigate("/login");
          return;
        }
        console.log(formData);
        
        try {
            const response = await axios.post('https://herobackend-xprm.onrender.com/api/programs/draft', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            alert("Added Successfully As Draft");
            setFormData({
              name: '',
              price: '',
              domain: '',
              programType: '',
              registrationsStatus: '',
              description: '',
              placementAssurance: false,
              imageUrl: '',
              universityName: '',
              facultyProfile: '',
              learningHours: '',
              
              certificateType: '',
              eligibilityCriteria: '',
            })
            console.log('Program submitted successfully!', response.data);
            // You can handle the response as needed
          } catch (error) {
            alert(" Error in Adding");
            console.error('Failed to submit program.', error.message);
            // Handle errors
          }
      

      };

  const handleClickProgram = (data) => (e) => {
  e.preventDefault();
  if(!localStorage.getItem("token"))
  {
    navigate("/login");
    return;
  }
  
   setviewED(true);
   setviewData(data.name);

 
   };
const handleInputsearch=(e)=>{

  setsearchData(e.target.value);
}
    return (
        <>
        <Navbar/>
        <div style={{display:'flex'}}>
           
          
           
           <div className="continer1" style={{margin:"20px"}}>
           <h1 className="inner1">List of Programs </h1>
            <p>Click on them to view complete information or to delete</p>
            
           <div className='inner2' style={{width:"100%"}}>
            <b>Search: </b>
            <input style={{width:"77%"}} type="text" placeholder='Name of Program' name="inputname" value={searchData} onChange={handleInputsearch}/>
            </div>
            <ul>

              { allProgram.map((data)=>{
                       
                    return (((data.name===searchData)||(searchData===''))&&<li key={data._id} style={ { cursor: 'pointer',padding:"20px 40px" ,background:"gray",margin:"10px", textAlign: "center"}} onClick={handleClickProgram(data)} name="Prateek" >{data.name}</li>)
               })
              }
           </ul>
           </div>
           
           


           



       <div className="continer2" style={{margin:"20px"}}>
        <h1>ADD A PROGRAM</h1>
    <form onSubmit={handleSubmit} style={formStyle}>
   <div className="innercontiner1" style={{display:"flex"}}>

   <label style={labelStyle}>
    <b>Price:<sup style={{color:"red"}}>*</sup></b> 
      <input type="text" name="price" value={formData.price} style={ {padding: '8px',
        width: '90%',
        boxSizing: 'border-box',
        marginBottom: '10px',}} onChange={handleChange} />
    </label>
    
    <label style={labelStyle}>
    <b>Domain:<sup style={{color:"red"}}>*</sup></b> 
      <input  style={inputStyle} type="text" name="domain" value={formData.domain} onChange={handleChange} />
    </label>
   
    
    <label  style={labelStyle}>
      <b> Placement Assurance:<sup style={{color:"red"}}>*</sup></b>
      <input
        type="checkbox"
        name="placementAssurance"
        style={{marginLeft:"20px"}}
        checked={formData.placementAssurance}
        onChange={handleChange}
        
      />
    </label>

   </div>
    
    
    <br />
    <h1>Information</h1>
    <div className="innercontainer2"  style={{display:"flex"}}>


    <label  style={labelStyle}>
      <b>Name:<sup style={{color:"red"}}>*</sup></b>
      <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} />
    </label>
    <label  style={labelStyle}>
    <b>Type of Program:<sup style={{color:"red"}}>*</sup></b>
    </label>
    <label style={{margin:"20px"}}  >
      FT
      <input style={{marginLeft:"20px"}} type="radio" name="programType" value="Open" onChange={handleChange} />
    </label>

     <label style={{margin:"20px"}}  >
      PT
      <input style={{marginLeft:"20px"}} type="radio" name="programType" value="Close" onChange={handleChange} />
    </label>    
    <label  style={labelStyle}>
    <b>Registration Open:<sup style={{color:"red"}}>*</sup></b>
    </label> 
    <label  style={{margin:"20px"}}  >
      OPEN
      <input type="radio" style={{marginLeft:"20px"}} name="registrationsStatus" value="Open" onChange={handleChange} />
    </label>

     <label style={{margin:"20px"}} >
      CLOSE
      <input type="radio"  style={{marginLeft:"20px"}} name="registrationsStatus" value="Close" onChange={handleChange} />
    </label>    






    </div>
    
    <br/>


    <div className="innercontaner3" style={{display:"flex"}}>
    <label style={labelStyle}>
      <b style={labelStyle}>Unviersty:<sup style={{color:"red"}}>*</sup></b>
     <input style={inputStyle} type="text" name="universityName" value={formData.universityName} onChange={handleChange} />
     </label>
     <label style={labelStyle}>
  <b style={labelStyle}>CertificateType:<sup style={{color:"red"}}>*</sup></b>
 <input style={inputStyle} type="text" name="certificateType" value={formData.certificateType} onChange={handleChange} />
 </label>
 <label style={labelStyle}>
<b style={labelStyle}>FacultyProfile :<sup style={{color:"red"}}>*</sup></b>
<input style={inputStyle} type="text" name="facultyProfile" value={formData.facultyProfile} onChange={handleChange} />
</label>
    
    </div>
    <br/>






    <div className="innercontainer4" style={{display:"flex"}}>
    <label style={labelStyle}>
  <b>LearningHours:<sup style={{color:"red"}}>*</sup></b>
  <input style={inputStyle} type="text" name="learningHours" value={formData.learningHours} onChange={handleChange} />
</label>
<label style={labelStyle}>
  <b>EligibilityCriteria:</b>
  <input style={inputStyle} type="text" name="eligibilityCriteria" value={formData.eligibilityCriteria} onChange={handleChange} />
</label>
<label style={labelStyle}>
 <div><b>ImageURL: <sup style={{color:"red"}}>*</sup></b></div>
  <input style={ {padding: '8px',
        width: '127%',
        boxSizing: 'border-box',
        marginBottom: '10px',}} type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
</label>


    </div>
    <br/>
     <label style={labelStyle}>
      <b>Description: <sup style={{color:"red"}}>*</sup></b>
      <br/>
      <textarea style={{width:"40%",height:"60%"}}name="description" value={formData.description} onChange={handleChange} />
    </label>
    <br />
    <div style={{display:"flex"}}>
    <button   style={{color:"white", margin:"10px", background:"green",border: "none",borderRadius: "5px",width:"10%"}}type="submit">Save</button>
    <button  style={{color:"white", margin:"10px", background:"green",border: "none",borderRadius: "5px",width:"15%"}} onClick={handleSaveDraft}>Save as Draft</button>
    </div>
  </form>
  </div>
  
  </div>
  {viewED? <Modal onClose={() => setviewED(false)}><ViewEd onChange={handlesetviewED} name={viewData} alldata={allProgram}></ViewEd></Modal> : ""}
    { /*{viewED && <ViewEd name={viewData} alldata={allProgram}/>}*/}
  </>
  )
}
