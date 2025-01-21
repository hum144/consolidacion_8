import Bootcamp from '../models/bootcamp.model.js';
import User from '../models/user.model.js';
import '../models/index.js'
import { QueryTypes } from 'sequelize';


export const createUser = async (usua) => {
    try {
        const { firstName, lastName, email, password } = usua;

        const findEmail = await User.findOne({ where: { email: email } })
        if (findEmail) {
            console.log(`El correo ${email} ya se encuentra registrado`)
            return;
        } else {
            const newUser = await User.create({ firstName, lastName, email, password });
            console.log(`Usuario ${firstName} creado con el email ${email}`)
        }
    } catch (error) {
        console.log(error)
    }
}

export const findUserById = async (id) => {
    try {
        const findUser = await User.findByPk(id, {
            include: [{
                model: Bootcamp,
                as: 'bootcamp',
                attributes: ["id", "title"]
            }],
            raw: true
        });
        if (!findUser) {
            console.log("Usuario no encontrado")
            return;
        } else {
            console.log(`Usuario ${id} y bootcamps registrados encontrados`, findUser)
        }

    } catch (error) {
        console.log(error)
    }
}

export const findUserByEmail = async (email) => {
    try {
        const findUser = await User.findOne({ where: { email: email } });
        if (!findUser) {
            console.log("Usuario no encontrado")
            return;
        } else {
            console.log(`Usuario ${email} encontrado`, findUser)
        }
    } catch (error) {
        console.log(error)
    }
}

export const findAllUsers = async () => {
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

export const updateUserById = async (usua) => {
    try {
        const findUser = await User.findOne({ where: { id: usua.id } });

        if (!findUser) {
            console.log("Usuario no existe/no encontrado.");
            return;
        } else {
            await User.update({
                firstName: usua.firstName,
                lastName: usua.lastName,
                email: usua.email,
                password: usua.password
            },
                { where: { id: usua.id } })
            console.log(await User.findByPk(usua.id, {
                raw: true
            }))
            console.log("Usuario actualizado")
        }
    } catch (error) {
        console.log(error)
    }
}
export const deleteUserById = async (id) => {
    try {
        const findUser = await User.findByPk(id);
        if(!findUser){
            console.log("Usuario no existe/no encontrado.");
            return;
        }else{
            await User.destroy({where:{id: findUser.id}})
            console.log("Usuario eliminado con exito")
        }

    } catch (error) {
        console.log(error)
    }
}


export default { createUser, findUserById, findAllUsers, updateUserById, deleteUserById, findUserByEmail }