const { Router } = require('express');
const router = Router();
const candyController = require("../controller/candy-controller");
const categorieController = require("../controller/categories-controller");
const customerController = require("../controller/customer-controller");
const multer = require('multer');
const upload = multer({ dest: 'public/images'})
//Rutas para dulces
router.post('/candy/create', upload.single('image'), candyController.createCandy)
router.put('/candy/update/:id', candyController.updateCandy)
router.get('/candy/getCandy', candyController.getCandy)
router.post('/candy/getCandies', candyController.getCandies)
router.delete('/candy/delete', candyController.deleteCandy)

//Rutas para categorias
router.post('/categorie/create', categorieController.createCategorie)
router.put('/categorie/update/:id', categorieController.updateCategorie)
router.get('/categorie/getCategorie/:id', categorieController.getCategorie)
router.get('/categorie/getCategories', categorieController.getCategories)
router.delete('/categorie/delete/:id', categorieController.deleteCategorie)

//Rutas para los clientes
router.post('/customer/login', customerController.Login)
router.post('/customer/create', customerController.Create)
router.get('/customer/validate', (req,res)=>{
    const customer = req.user
    res.status(200).json(customer)
})
router.put('/customer/update/:id', customerController.Update)
router.get('/customer/info/:id', customerController.GetInfo)
router.delete('/customer/detele/:id', customerController.Delete)

module.exports = router;