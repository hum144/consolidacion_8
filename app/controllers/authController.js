import jwt from 'jsonwebtoken'
import Usuario from '../models/user.model.js';
import usuarioController from './user.controller.js';


const SECRET_KEY = 'SECRET';

export const loginUser = async(req, res) => {
    const { email, password } = req.body;
    

        const user = await usuarioController.findUserByEmail(email)
        if (!user) {
            return res.status(401).send('Credenciales invalidas')
        }

        if (password !== user.password) {
            console.log(user)
            return res.status(401).send('Credenciales invalidas')
        }
        const token = jwt.sign(
            {firstName: user.firstName,lastName: user.lastName, id: user.id, email:user.email, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600,},
            SECRET_KEY,
            { algorithm: 'HS256' }
        )
        
        return res.json({token, email})
    }



export default loginUser
