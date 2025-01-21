import jwt from 'jsonwebtoken'

const SECRET_KEY = 'SECRET';

export const verifyToken=(req, res, next)=>{
    const token=req.headers['authorization'];
    if(!token) return res.status(401).send('Token requerido')
    jwt.verify(token, SECRET_KEY,(err, decoded)=>{
        if(err) {
            return res.status(402).send(JSON.stringify('token invalido'));
        }
        req.user = decoded;
        next();
    })
}

export default {verifyToken}