const jwt = require('jsonwebtoken');
const CustomerModel = require('../models/customer');

module.exports.redirectAfterAuthentication = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader){
        const authtoken = authHeader.split(' ')[1];
        const verified = await jwt.verify(authtoken, process.env.JWT_SECRET)
        const customer = await CustomerModel.findOne({_id:verified._id})
        if(customer){
            req.user = customer;
            next();
        }else{
            return res.status(401).json({
                status: 401,
                message: 'unauthorized.'
            });
        }
    }else{
        return res.status(401).json({
            status: 401,
            message: 'unauthorized.'
        });
    }
}