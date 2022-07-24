const candyModel = require ("../models/candy");
const categorieModel = require ("../models/categories");
const ObjectId = require("mongoose").Types.ObjectId;


exports.createCategorie = async (req, res) => {
    try {
        await categorieModel.create(req.body).catch(err =>{
            console.log(err.message)
            return res.status(400).json({error: "Algo salio mal al intentar crear la categoria"});
        })
        return res.status(200).json({success:"Categoria creada correctamente"});
    } catch (error) {
        console.log(error.message)
	    return res.status(400).json({error: "Algo salio mal al intentar crear la categoria"});
    }
}

exports.getCategorie = async (req, res) => {
    try {
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:"ID invalido o inexistente"})
        }
        const categoria = await categorieModel.findOne({_id:req.params.id});
        return res.status(200).json(categoria);
    } catch (error) {
        console.log(error.message)
	    return res.status(400).json({error: "Algo salio mal al intentar obtener la categoria"});
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categorias = await categorieModel.find();
        return res.status(200).json(categorias);
    } catch (error) {
        console.log(error.message)
	    return res.status(400).json({error: "Algo salio mal al intentar obtener los categorias"});
    }
}

exports.updateCategorie = async (req, res) => {
    try {
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:"ID invalido o inexistente"})
        }
        await categorieModel.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        }).catch(err =>{
            console.log(err.message)
            return res.status(400).json({error: "Algo salio mal al intentar editar la categoria"});
        });
        return res.status(200).json({success:"Categoria editada correctamente"});
    } catch (error) {
        console.log(error.message)
	    return res.status(400).json({error: "Algo salio mal al intentar editar la categoria"});
    }
}

exports.deleteCategorie = async (req, res) => {
    try {
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:"ID invalido o inexistente"})
        }
        const candies = await candyModel.find({categorie: req.params.id});
        if(candies.length > 0){
            return res.status(400).json({error: "La categoria tiene dulces ligados a ella, por lo tanto no se puede eliminar. Intente eliminando todos los dulces ligados a esta categoria"});
        }
        await categorieModel.findOneAndRemove({_id:req.params.id}).catch(err =>{
            console.log(err.message)
            return res.status(400).json({error: "Algo salio mal al intentar eliminar la categoria"});
        });
        return res.status(200).json({success:"Categoria eliminada correctamente"});
    } catch (error) {
        console.log(error.message)
	    return res.status(400).json({error: "Algo salio mal al intentar eliminar la categoria"});
    }
}