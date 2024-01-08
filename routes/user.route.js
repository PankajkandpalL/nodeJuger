const express = require("express");
const bcrypt = require("bcrypt")
const { userModel, userTokenModel } = require("../models/user.model");
const { passValidate } = require("../controller/passValidate");
const jwt = require('jsonwebtoken');


const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    const { name, email, pass, city, age } = req.body;
    //console.log(req.body)
    try {
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        res.status(400).send({ "error": 'User with this email already exists' });
      }else{
        if (passValidate(pass)) {
            bcrypt.hash(pass, 10, async (err, hash) => {
              if (err) {
                res.status(500).send({ "error": err.message });
              }else{
                const user = new userModel({
                    name,
                    email,
                    pass: hash,
                    city,
                    age,
                  });
                  await user.save();
                  res.status(200).send({ "msg": 'The new user has been registered', "registeredUser": user });
              }
            });
          } else {
            res.status(400).send({ "error": 'Password does not follow the required conditions' });
          }
      }
    } catch (err) {
      res.status(400).send({ "error": err.message });
    }
  });

  userRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(200).send({ "error": 'Invalid credentials' });
      }else{
        const passwordMatch = await bcrypt.compare(pass, user.pass);
        if (!passwordMatch) {
            res.status(200).send({ "error": 'Invalid credentials' });
        }else{
            var token = jwt.sign({ course: 'nem111' }, "masai", { expiresIn: 1800 });
            res.status(200).send({ "msg": 'Login successful!', "token":token });
        }
      }
    } catch (err) {
      return res.status(400).send({ "error": err.message });
    }
  });
  userRoute.get('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    try {
      if (!token) {
        res.status(400).send({ "error": 'Token not provided' });
      }
      else{
        const blacklistedToken = new userTokenModel({ token });
        await blacklistedToken.save();
        res.status(200).send({ "msg": 'User has been logged out' });
      }
      
    } catch (err) {
      res.status(500).send({ error: err.message || 'An error occurred during logout' });
    }
  });
module.exports={userRoute}