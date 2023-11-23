//import { googleStrategy } from '../middlewares/googleOauth.js';
import passport from "passport"; 

export const googleAuth = async(req, res) => {
    return passport.authenticate('google', { scope: ['email', 'profile']})
}
