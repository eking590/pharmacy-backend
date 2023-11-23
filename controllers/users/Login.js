import express from "express";
import User from "../../models/user.js";
import bcrypt from 'bcrypt'


import pkg from 'jsonwebtoken'; 
import { PasswordCorrect } from "../../utils/index.js";


export const Login = async(req, res, next) =>{
    const jwt = pkg; 
    const { email, password } = req.body;
    
    //check if user with email already exists 
    const userExists = await User.findOne( {email} ); 
    if (!userExists) {
        res.status(404)
    } 

    //check if password is correct 
    const passwordCorrect = await PasswordCorrect(password, userExists)
    if (passwordCorrect) {
        const user = {
            data: userExists
    }
        const accessToken = jwt.sign( { user: user}, 'eking@590', {
            expiresIn: '1h'
        })
        const refreshToken = jwt.sign( { user: user }, 'eking@590', {
            expiresIn: '30d'
        })
        return res.status(200).send({
            msg: "login Successfully", 
            accessToken, 
            refreshToken
        }) 
        //refresh token here 
    }
    if (!passwordCorrect) {
        res.status(404)
    }
    return res.json({'msg': 'Something went wrong'})
}




