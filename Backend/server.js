const express= require('express');
const app= express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const cors= require('cors');
const userRoute= require('./routes/userRoute');

app.use(cors());
app.use(express.json());
app.use('/api/users',userRoute);

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT ||8000 ,(err)=>{
        if(err)
            console.log("Not connected to the database");
        else
            console.log("Connected to the database: "+process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})
