const CustomerModel = require('../models/customer');
const jwt = require('jsonwebtoken');

exports.Create = async (req, res) =>{
    try {
        const customer = await CustomerModel.create(req.body).catch(err=>{
            return res.status(400).json({error: "Algo salio mal al intentar crear el cliente", mesage:err.message});
        })
        return res.status(200).json({customer});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Algo salio mal al intentar crear el cliente"});
    }
}

exports.Update = async (req, res) =>{
    try {
        const { id } = req.params;
        await CustomerModel.findByIdAndUpdate(id,{
            $set: req.body
        }).catch(err=>{
            return res.status(400).json({error: "Algo salio mal al intentar editar al cliente", mesage:err.message});
        })
        return res.status(200).json({message:'Cliente actualizado exitosamente'});
    } catch (error) {
        console.log(error.mesage);
        return res.status(500).json({error: "Algo salio mal al intentar editar al cliente"});
    }
}

exports.Delete = async (req, res) =>{
    try {
        const { id } = req.params;
        await CustomerModel.findByIdAndDelete(id).catch(err=>{
            return res.status(400).json({error: "Algo salio mal al intentar eliminar al cliente", mesage:err.message});
        })
        return res.status(200).json({message:'Cliente eliminado exitosamente'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Algo salio mal al intentar eliminar al cliente"});
    }
}

exports.GetInfo = async (req, res) =>{
    try {
        const { id } = req.params;
        const customer = await CustomerModel.findById(id).catch(err=>{
            return res.status(400).json({error: "Algo salio mal al intentar encontrar al cliente", mesage:err.message});
        })
        return res.status(200).json(customer);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Algo salio mal al intentar encontrar al cliente"});
    }
}

exports.Login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const customer = await CustomerModel.findOne({email:email});
        if(!customer){
            return res.status(400).json({error: "El cliente no exisite"});
        }
        if(!customer.isValidPassword(password)){
            return res.status(400).json({error: "Informacion errornea, verifique los datos"});
        }
        await CustomerModel.findByIdAndUpdate(customer._id,{
            $set:{
                logged:true
            }
        })
        const token = await jwt.sign(customer.toJSON(), process.env.JWT_SECRET);
        if(!token){
            return res.status(400).json({error: "Error al crear el token"});
        }
        return res.status(200).json(token);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Algo salio mal"});
    }
}

exports.Logout = async (req, res) =>{
    try {
        const {id} = req.params;
        await CustomerModel.findByIdAndUpdate(id,{
            $set:{
                logged:false
            }
        })
        return res.status(200).json({message:'Customer logout successfully'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Algo salio mal"});
    }
}