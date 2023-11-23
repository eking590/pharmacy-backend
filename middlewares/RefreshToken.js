import pkg from 'jsonwebtoken'; 
import { Login } from '../controllers/users/Login.js';


export const RefreshToken = async(req, res, next) =>{
    const jwt = pkg; 
    //let refreshToken 
    let authHeader = req.headers.Authorizationi || req.headers.authorization; 
    if(authHeader && authHeader.startsWith('Bearer')){
        refreshToken = authHeader.split(' ')[1]; 

        jwt.verify(
            refreshToken, 'eking@590', (err, decoded) => {
                if (err) {
                    res.status(401).json({msg: "User is not Authorized!"})

                }
                req.user = decoded.user.data;
                newAccesstoken = refreshToken 
                next() 
            }
            
        ) 
        if (refreshToken == undefined) {
            res.status(401).json({msg: 'User is not Authorized!!'})
        }
    }
}