const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/User');
mongoose.connect('mongodb://127.0.0.1:27017/Module')
mongoose.connection.on("connected",()=>{
    console.log("Datbase connected");
})
mongoose.connection.on("error",()=>{
    console.log("Database Error")
})

const app=express()
app.use(express.json());

app.get('/profile', async (req,res)=>{
    const resp=await User.find();
    console.log(resp);
    res.send(resp);
});


app.post('/profile',async(req,res)=>{
    try{
        const re=new User(req.body);
        const sa= await re.save();
        res.send(User);
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.put('/profile/:id',async (req,res)=>{
    try{
        const id=req.params.id; 
       const u= await User.findOneAndUpdate({id},req.body,{new:true});
    res.send(User);
   }catch(error){
    res.status(500).send(error.message);
   }
   });

app.delete('/profile/:id',async (req,res)=>{
    try{
        const id=req.params.id;
    const d=  await User.findOneAndDelete({id})
    res.send(User);
    }catch(error){
     res.status(500).send(error.message);
    }
    });  
app.options('/profile',(req,res)=>{
    res.send("Server is properly running");
})

app.listen(5100);












