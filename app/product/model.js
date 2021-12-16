const sequelize = require('../../config/connection');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

(async ()=>{
    await Product.sync();
})();

module.exports = Product;
