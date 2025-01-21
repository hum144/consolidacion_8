import db from './app/config/db.config.js'
import './app/models/index.js'
import userController from './app/controllers/user.controller.js'
import bootcampController from './app/controllers/bootcamp.controller.js'
import authController from './app/controllers/auth.controller.js'


import express from 'express'
import cors from 'cors'
import { verifyToken } from './app/middleware/authMiddleware.js'
import loginUser from './app/controllers/authController.js'

const app = express()

const PORT = 3000

const main = async () =>{
    try {
        await db.authenticate()
        await db.sync({force: false, alter: true})
    } catch (error) {
        console.log("Error de conexion: ", error)
    }
}

main();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.post('/api/signup', async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const user={firstName: firstName, lastName: lastName, email: email, password: password}
    try {
        res.send()
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.post('/api/signin', loginUser)

app.get('/api/user/:id',verifyToken, async (req, res) => {
    
    try {
        res.send(await userController.findUserById(req.params.id))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.get('api/user/',verifyToken, async (req, res) => {
    try {
        res.send(await userController.findAllUsers())
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.put('/api/user/:id',verifyToken, async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const user={id: req.params.id, firstName: firstName, lastName: lastName, email: email, password: password}
    try {
        res.send(await userController.updateUserById(user))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.delete('/api/user/:id',verifyToken, async (req, res) => {
    try {
        res.send(await userController.deleteUserById(req.params.id))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.post('/api/bootcamp',verifyToken, async (req, res) => {
    const {title, cue, description} = req.body
    const bootcamp={title: title, cue: cue, description: description}
    try {
        res.send(await bootcampController.createBootcamp(bootcamp))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.post('/api/bootcamp/adduser',verifyToken, async (req, res) => {
    const {userId, bootcampId} = req.body
    try {
        res.send(await bootcampController.addUser(userId, bootcampId))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.get('/api/bootcamp/:id',verifyToken, async (req, res) => {
    try {
        res.send(await bootcampController.findById(req.params.id))
    } catch (error) {
        res.status(400).send({ error })
    }
})

app.get('/api/bootcamp', async (req, res) => {
    try {
        res.send(await bootcampController.findAllBootcamp())
    } catch (error) {
        res.status(400).send({ error })
    }
})


app.listen(PORT, () => {
    try {
        console.log(`Servidor iniciado en http://localhost:${PORT}`)
    } catch (error) {
        console.log(`error: `, error)
    }
})