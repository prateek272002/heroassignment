
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('./fetchdetails');
const jwtSecret = "HaHa"
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoDB=require("./db")
mongoDB();
app.use(cors());

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
      },
      price: {
        type: String,
        required: true,
      },
      domain: {
        type: String,
        required: true,
      },
      programType: {
        type: String,
        required: true,
      },
      registrationsStatus: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      placementAssurance: {
        type: Boolean,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      universityName: {
        type: String,
        required: true,
      },
      facultyProfile: {
        type: String,
        required: true,
      },
      learningHours: {
        type: String,
        required: true,
      },
      
      certificateType: {
        type: String,
        required: true,
      },
      eligibilityCriteria: {
        type: String,
      },
    
  });



  const user=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      // Ensure uniqueness
    },
    email:{
      type: String,
      required: true,
      unique: true // Ensure uniqueness
    },
    password:{
      type: String,
      required: true, // Ensure uniqueness
    }


  })




  const programDraftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
      },
      price: {
        type: String,
        required: true,
      },
      domain: {
        type: String,
        required: true,
      },
      programType: {
        type: String,
        required: true,
      },
      registrationsStatus: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      placementAssurance: {
        type: Boolean,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      universityName: {
        type: String,
        required: true,
      },
      facultyProfile: {
        type: String,
        required: true,
      },
      learningHours: {
        type: String,
        required: true,
      },
      
      certificateType: {
        type: String,
        required: true,
      },
      eligibilityCriteria: {
        type: String,
      },
    
  });




  const Program = mongoose.model('Program', programSchema);
  const Draft= mongoose.model('Draft', programDraftSchema);
  const User=mongoose.model('User',user);
  app.use(express.json());




app.get('/', (req, res) => {
  res.send('Hello World!')
})
//-----------------------------------route for signup---------------------------------------------------
app.post('/api/programs/signup',[
  body('email').isEmail(),
  
], async (req, res) => {
  console.log(req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.json({ success:false, errors: errors.array() })
  }
  const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
 try {
  await User.create({
    name: req.body.name,
    // password: req.body.password,  first write this and then use bcryptjs
    password: securePass,
    email: req.body.email,
   
}).then(user => {
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, jwtSecret);
    success = true
    res.json({ success:true, authToken:authToken })
})
    .catch(err => {
        console.log(err);
        res.json({ error: "Please enter a unique value." })
    })
} catch (error) {
console.error(error.message)
}
});

//-----------------------------------route for login---------------------------------------------------
app.post('/api/programs/login', [
  body('email', "Enter a Valid Email").isEmail(),
body('password', "Password cannot be blank").exists()
],async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.json({ success:false,errors: "Invalid Email or Password not be blank" })
  }

  const { email, password } = req.body;
  try {
      let user = await User.findOne({ email });  //{email:email} === {email}
      if (!user) {
          return res.json({ success:false, error: "Try Logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
          return res.json({ success:false, error: "Try Logging in with correct credentials" });
      }
      const data = {
          user: {
              id: user.id
          }
      }
      
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success:true, authToken:authToken })


  } catch (error) {
      console.error(error.message)
      res.json({error:"Server Error"})
  }
})



//-----------------------------------route to get all programs---------------------------------------------------
app.get('/api/programs', async (req, res) => {
    try {
      const allPrograms = await Program.find();
      res.status(200).json(allPrograms);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //-----------------------------------route to a new program---------------------------------------------------
app.post('/api/programs', async (req, res) => {
     console.log(req.body);
    try {
        const newProgram = new Program(req.body);
        await newProgram.save();
        res.status(201).json({ message: 'Program submitted successfully' });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Please enter details (Required Fields are missing )' });
      }
  });

  //-----------------------------------route to new draft program---------------------------------------------------
  app.post('/api/programs/draft', async (req, res) => {
    console.log(req.body);
   try {
       const newDraft = new Draft(req.body);
       await newDraft.save();
       res.status(201).json({ message: 'Program submitted successfully' });
     } catch (error) {
       console.error('Error:', error.message);
       res.status(500).json({ error: 'Please enter details (Required Fields are missing )' });
     }
 });
 //-----------------------------------route to delete program---------------------------------------------------
  app.delete('/api/programs/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const deletedProgram = await Program.findOneAndDelete({ name });
  
      if (deletedProgram) {
        res.status(200).json({ message: `Program ${name} deleted successfully` });
      } else {
        res.status(404).json({ error: `Program ${name} not found` });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//-----------------------------------route to  program---------------------------------------------------
  app.put('/api/programs/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find the program by name
      const programToUpdate = await Program.findOne({ name });
  
      if (!programToUpdate) {
        return res.status(404).json({ error: `Program ${name} not found` });
      }
  
      // Update the program fields based on the request body
      programToUpdate.set(req.body);
  
      // Save the updated program
      await programToUpdate.save();
  
      res.status(200).json({ message: `Program ${name} updated successfully` });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
