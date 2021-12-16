const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const addProduct = async (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            const result = await Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
            res.send({
                status: 'Ok',
                response: result,
            });
        } catch (err) {
            res.send({
                status: 'failed',
                response: err,
            });
        }
    }
}

const getProduct = async (req, res) => {
    const { search } = req.query;
    let result = {};
    if (search) {
        try {
            result = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    }
                }
            });
            res.send({
                status: 'Ok',
                response: result,
            });
        } catch (err) {
            res.send({
                status: 'failed',
                response: err,
            });
        };
    } else {
        try {
            result = await Product.findAll();
            res.send({
                status: 'Ok',
                response: result,
            })
        } catch (err) {
            res.send({
                status: 'failed',
                response: err,
            })
        }
    }
}

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Product.findAll({
            where: {
                id,
            },
        });
        res.send({
            status: 'Ok',
            response: result,
        });
    } catch (err) {
        res.send({
            status: 'failed',
            response: err,
        });
    }
}

const updateById = async (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    const id = req.params.id;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            const result = await Product.update(
                { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` },
                { where: { id } }
            );
            res.send({
                status: 'Ok',
                response: result,
            });
        } catch (err) {
            res.send({
                status: 'failed',
                response: err,
            });
        }
    } else {
        try {
            const result = await Product.update(
                { name, price, stock, status},
                {where : {id}}
            );
            res.send({
                status : 'Ok',
                response : result,
            });
        } catch (err){
            res.send({
                status : 'failed',
                response : errr,
            });
        }
    }
}

const deleteById = async(req,res)=>{
    const id = req.params.id;
    try{
        const result = await Product.destroy({
            where : {
                id,
            },
        });
        res.send({
            status: 'Ok',
            response : result,
        });
    } catch(err){
        res.send({
            status : 'Ok',
            response : err,
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    getById,
    updateById,
    deleteById,
}