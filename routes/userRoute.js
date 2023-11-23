import express from 'express'; 
import passport from 'passport';

const router = express.Router();

import { SignUp } from '../controllers/users/SignUp.js';
import { Login } from '../controllers/users/Login.js';
import { ValidateToken } from '../middlewares/ValidateToken.js';
import { CurrentUser } from '../controllers/users/currentUser.js';
import { RefreshToken } from '../middlewares/RefreshToken.js';
import { googleStrategy } from '../middlewares/googleOauth.js';


//create a user 
router.post("/api/v1/register", SignUp); 

//login user 
router.post("/api/v1/login",    Login); 


//current user 
router.get("/api/v1/current-user", ValidateToken, CurrentUser)



//refresh token 
router.post("/api/v1/refresh-token", RefreshToken)


//googleOauth 
router.get("/auth/google", googleStrategy)

//router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email']}))
// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//       // Redirect or respond with success message
//       res.redirect('/dashboard');
//     }
//   );


export { router as userRoute }; 

//http://localhost:8080/auth/google/callback 

//googleOauth 
//("/api/v1/auth/google/callback")

