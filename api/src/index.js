const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected!");
}).catch(err => {
	console.log(err)
    console.error("App starting error:", err.message);
});
app.use(logger('dev'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/api',require('./routes/api'));

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});