import express from 'express'; 
import User from '../../models/user.js'; 
import { hashPassword } from '../../utils/index.js';
import bcrypt from 'bcrypt'; 



export const SignUp = async(req, res) =>{
    const  { firstName, lastName, email, phoneNumber } = req.body; 
    const password = await hashPassword(req.body.password); 
    const user = new User({ firstName,  lastName, email, phoneNumber, password})

    try {
        const userExists = await User.findOne({ email }); 
        if (userExists) {
            console.log(userExists)
            return res.status(201).send({ msg: "User already exist!!"})
        }
        //save user to database 
        await user.save(); 
        //send welcome email here 
        //welcomeEmail(user.email, user.firstName)
        const data = user
        res.status(201).send({
            data: data, 
            msg: "Signup successful"
        })
    } catch (error) {
        console.log('there was an error ', error); 
        res.status(400).send(error); 
    }
}