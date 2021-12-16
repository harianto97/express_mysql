const express = require('express');
const path = require('path');
const logger = require('morgan');
const ProductRouter = require('./app/product/routing');
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api',ProductRouter);
app.use((req,res,next)=>{
    res.status(404);
    res.send({
        status : 'failed',
        message: `Resource ${req.originalUrl} not found`,
    })
})

app.listen(port,()=>console.log(`App berjalan pada: http://localhost:${port}`));