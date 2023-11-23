import bcrypt from 'bcrypt'; 
import User from '../models/user.js';
import fetch from 'node-fetch'; 
import nodemailer from 'nodemailer'; 
import { SignUp } from '../controllers/users/SignUp.js';






//hash password
export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword; 
}


//check if password is correct 

export const PasswordCorrect = async(password, userExists) =>{
    const passwordCorrect = await bcrypt.compare(password, userExists.password)
    return passwordCorrect; 
} 


//send welcome email 
//export const welcomeEmail = async(email, firstName)




