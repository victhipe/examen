const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Product = require('./product');
const Users = require('./users');
const PORT = 9001;


const app = express();
app.use(cors());
app.use(express.json());

async function start() {
    try{
    await mongoose.connect('mongodb://localhost:27017/store')
          app.listen(PORT, ()=>{console.log(PORT + 'Запущен на порте 9001')})
    }catch(e){
   console.log(e)
    }
}
start();



app.get('/api/product', async(req,res)=>
{try{
  const product = await Product.find();
 res.json(product);
}catch(e){
    console.log(e)
}}
)

app.post('/api/register', async(req,res)=>{
try{
    console.log(req.body)
    const {login, adress, password,email } =req.body;
    if(!login || !adress || !password || !email){
         return  res.status(400).json({message: 'данных нету'})
    }
    const newusers = await new Users({
        login: login,
        password: password,
        adress: adress,
        email: email
    })
   await newusers.save();
   res.json({message: 'Регистрация была успешна завершена'})
}catch(error){
    return res.status(400).json({message: 'Проблема с базой данных'})
}
}
)
app.post('/api/login', async(req,res)=>{
try{
    console.log(req.body)
    const {login, password} =req.body;
    if(!login || !password ){
         return  res.status(400).json({message: 'данных нету'})
    }
   const user = await Users.find({login: login})
   if(!user){
    return  res.status(400).json({message: 'пользователь не найден'})
   }
   const token = jwt.sign({login: user.login, id: user._id}, 'SECRET_KEY', {expiresIn: '24'})
   res.json({message: 'Вы авторизовались', token: token, login: login})
}catch(error){
    return res.status(400).json({message: 'Проблема с базой данных'})
}
}
)