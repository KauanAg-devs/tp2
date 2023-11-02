import express from 'express'
import mongoose from 'mongoose'
import userModel from './models/userModel';

const app = express();
app.use(express.json());



mongoose.connect('mongodb://127.0.0.1:27017/mongo')
 .then(()=>{

app.post('/getUser', async (req,res)=>{
    const { email, password } = req.body as userUI;
    const foundUser = await userModel.findOne({email, password})
    res.status(foundUser ? 200 : 404).json({message: foundUser ?? `account not found`})
})
  
app.post('/post',async (req,res) =>{
    const {email, password} = req.body as userUI
    const createdUser = await userModel.create({email, password})
    res.status(201).json({message: createdUser})
})

app.put('/put', async (req,res)=>{
    const {email, password, newEmail, newPassword} = req.body as userUI&{newPassword: string, newEmail: string}
    const updatedUser = await userModel.findOneAndUpdate({email, password}, {email: newEmail, password: newPassword})
    res.json({ message: updatedUser })
})
  
app.delete('/delete', async (req,res)=>{
    const { email, password } = req.body as userUI;
    const deletedUser = await userModel.findOneAndDelete({email, password})
    res.json({message: deletedUser})
})  

app.use((req,res)=>{
    res.status(404).json(`route doesn't exists.`)
})

app.listen(3000, ()=>console.log(`server listening at PORT ${3000}`))

})
