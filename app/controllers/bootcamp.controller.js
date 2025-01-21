import Bootcamp from '../models/bootcamp.model.js';
import User from '../models/user.model.js';
import '../models/index.js'
import { QueryTypes } from 'sequelize';


export const createBootcamp = async ()=>{
    try {
        const {title, cue, description} = nuevoBootcamp

        const newBootcamp = await Bootcamp.create({
            title, cue, description
        });
        console.log("Bootcamp creado exitosamente")
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async(userId, bootcampId)=>{
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log("Bootcamp no encontrado")
            return;
        }
        const user=await User.findByPk(userId)
        if (!user) {
            console.log("Usuario no encontrado")
            return;
        }
        await user.addBootcamp(bootcamp)
        console.log(`Usuario id:${user.id} añadido al BootCamp id:${bootcamp.id}`)
    } catch (error) {
        console.log(error)
    }
}

export const findById = async(id)=>{
    try {
        const findBootcamp = await Bootcamp.findByPk(id, {
            raw: true,
            include: [{
                model: User,
                as: 'User',
                attributes: ["id", "firstName", "lastName", "email"]
            }],
        });
        if (!findBootcamp) {
            console.log("Bootcamp no encontrado")
            return;
        } else {
            console.log(`Bootcamp ${id} encontrado`, findBootcamp)
        }
    } catch (error) {
        console.log(error)
    }
}

export const findAllBootcamp = async()=>{
    try {
        const allUsers = await findAll({
            include: [{
                model: Bootcamp,
                as: 'bootcamp',
                attributes: ["id", "title"]
            }],
            raw: true
        })
        console.log(allUsers)
    } catch (error) {
        console.log(error)
    }
}

export default {createBootcamp, addUser, findById, findAllBootcamp}