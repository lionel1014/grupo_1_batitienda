const PATH = require('path');
const fs = require('fs');

const productsMock = require("../database/productos.json");
const productsFilePath = PATH.join(__dirname, '../database/productos.json');
const db = require('../database/models');

const products = { 
    getAllProducts: function() {
        return db.Product.findAll({ include: ['product_categories'] })
            .then(products => {
                return products;
            })
            .catch(error => {
                throw error;
            });
    },

    findProductByRequest : function ({params}){

        return db.Product.findByPk(params.id, { include: ['product_categories'] })
            .then(product => {
                return product
            })
    },

    findProductBySubcategory : async function (subcategoryParams){
        const products = await db.Product.findAll({
            include: [{
                model: db.ProductCategory,
                as: 'product_categories',
                where: subcategoryParams ? { product_category_id: subcategoryParams } : {}// Condición para la relación
            }]
        })

        return products;
    },

    filterProducts: function(request){
        const {category, subcategory} = request.query

        const includeOptions = [{
            model: db.ProductCategory,
            as: 'product_categories',
            where: { category: category }
        }];
          
        if (subcategory) {
            includeOptions[0].where.sub_category = subcategory;
        }
        return db.Product.findAll({
            include: includeOptions
        })
            .then(products => {
                return products;
            })
            .catch(error => {
                throw error;
            });

    },

    saveProduct: function(response, productsPreviousSave, productData = null){
        fs.writeFileSync(productsFilePath, JSON.stringify(productsPreviousSave, null, 2), 'utf-8');
    },

    createProduct: async function(request){
        const { titulo, precio, stock, subcategoria, descripcion} = request.body;
        const product_category_id = subcategoria ? Number(subcategoria) : null;
    
        const productData = {
            title: titulo,
            price: +precio,
            stock: +stock,
            description: descripcion,
            image: `${request.file?.filename}`,
            product_category_id: product_category_id
        };
    
        const product = await db.Product.create(productData);
        
        return product?.product_id ? product?.product_id : "Product was not created";
    },

    updateProduct: async function(request){
        const { id } = request.params;
        const { titulo, precio, stock, subcategoria, descripcion } = request.body
        const product_category_id = subcategoria ? Number(subcategoria) : null;

        const productBeforeUpdate = await db.Product.findByPk(id);

        if (!productBeforeUpdate) {
            return "Product not found";
        }

        const productData = {
            title: titulo,
            price: +precio,
            stock: +stock,
            description: descripcion,
            image: `${request.file?.filename}`,
            product_category_id: product_category_id
        };

        const [rowsUpdated] = await db.Product.update(productData, {
            where: {
                product_id: id
            }
        });

        if (rowsUpdated > 0){
            const previousImage = productBeforeUpdate.image;
            fs.unlinkSync(PATH.join(__dirname, `../public/images/img_products/${previousImage}`));
            return id;
        }
        return "Product was not edited";
    },

    deleteProduct: async function (request){
        const { id } = request.params;

        const productBeforeDelete = await db.Product.findByPk(id);

        if (!productBeforeDelete) {
            return "Product not found";
        }

        const rowsDeleted = await db.Product.destroy({
            where: {
              product_id: id
            },
        });

        if(rowsDeleted > 0){
            const previousImage = productBeforeDelete.image;
            fs.unlinkSync(PATH.join(__dirname, `../public/images/img_products/${previousImage}`));
            return true;
        }

        return "Product was not deleted";
    }
}

module.exports = products