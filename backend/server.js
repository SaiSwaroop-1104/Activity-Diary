// activity-diary-backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Activity = require('./models/Activity');
const dotenv=require('dotenv')
dotenv.config({path:'C:/Users/swaroop/Desktop/Activity Diary/.env'})

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"))
// console.log(process.env)
// Connect to MongoDB Atlas
const mongoURI = "mongodb+srv://Sai_1104:sai1104@cluster0.auznklo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(console.log("Connected to MONGODB")).catch(err=>{console.log(err)});

// Routes
app.get('/api/activities', async (req, res) => {
 const activities = await Activity.find();
 res.json(activities);
});

//updating status
// server.js
app.put('/api/activities/:id', async (req, res) => {
    try {
        console.log("I was here")
       const activity = await Activity.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
       if (!activity) {
         return res.status(404).send('The activity with the given ID was not found.');
       }
       res.send(activity);
    } catch (error) {
       res.status(400).send(error);
    }
   });
   

app.post('/api/activities', async (req, res) => {
 const activity = new Activity(req.body);
 await activity.save();
 res.json(activity);
});

const PORT = 8000 || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
