const ProductService = require("../services/ProductService");
const { validationResult } = require("express-validator")

const db = require('../database/models');
const { Op } = require('sequelize')

const productController = {

    index: function(request, response){
        ProductService.findProductByRequest(request)
            .then(async productSelected => {
                const productsRelationed = await ProductService.findProductBySubcategory(productSelected?.product_category_id);
                response.render("product/productDetail",{product: productSelected, title: '' , productsRelationed})
            })
    },

    carPage: function(request, response){
        response.render("product/productCar")
    },

    createPage: function(request, response){
        response.render("product/createProduct", {title: '- crear producto'})
    },

    createProduct: function(request, response){
        let errors = validationResult(request);
        if (errors.isEmpty()){
            ProductService.createProduct(request)
                .then( productCreatedId => {
                    if (Number.isInteger(productCreatedId)) {
                        response.redirect(`/product/${productCreatedId}`)
                    }else{
                        response.redirect(`/`)
                    }
                })
        }else{
            response.render("product/createProduct", {title : '- crear producto', errors : errors.array()})
        }
    },

    editPage: function(request, response){
        ProductService.findProductByRequest(request)
            .then(async productSelected => {
                response.render("product/editProduct",{product: productSelected})
            })
    },

    updateProduct: function(request,response){
        ProductService.updateProduct(request)
            .then( productEditedId => {
                if (productEditedId) {
                    response.redirect(`/product/${productEditedId}`)
                }else{
                    response.redirect(`/`)
                }
            })
    },

    deleteProduct: function(request, response){
        ProductService.deleteProduct(request)
            .then( wasProductDeleted => {
                if (wasProductDeleted == true) {
                    response.redirect(`/user/profile`)
                }else{
                    response.redirect(`/`)
                }
            })
    },

    listPage: function(request, response){

        if (Object.keys(request.query).length == 0 ) {
            ProductService.getAllProducts()
                .then(products => {
                    response.render("product/productList",{products, title: ''});
                })
            return;
        }

        ProductService.filterProducts(request)
            .then(filterProducts => {
                response.render("product/productList",{products: filterProducts, title: ''});
            })

    },

    list: (req, res) => {
        db.Product
            .findAll({
                include: {
                    model: db.ProductCategory,
                    as: 'product_categories'
                }
            })
            .then(products => {
                const productsData = products.map(product => ({
                    id: product.product_id,
                    name: product.title,
                    description: product.description,
                    category: product.product_categories.category,
                    detail: `${req.protocol}://${req.get('host')}/product/api/products/${product.product_id}`
                }));

                const countByCategory = {};
                products.forEach(product => {
                    const category = product.product_categories.category;
                    if (countByCategory[category]) {
                    countByCategory[category]++;
                    } else {
                    countByCategory[category] = 1;
                    }
                });
                
                return res.status(200).json({
                    count: products.length,
                    countByCategory: countByCategory,
                    products: productsData,
                    status: 200
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },

    show: (req, res) => {
        const productId = req.params.id;

        db.Product
            .findByPk(productId, {
                include: {
                    model: db.ProductCategory,
                    as: 'product_categories'
                }
            })
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        error: 'Product not found',
                        status: 404
                    });
                }

                const productData = {
                    id: product.product_id,
                    name: product.title,
                    price: product.price,
                    stock: product.stock,
                    description: product.description,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/img_products/${product.image}`, // Ajusta la ruta relativa de la imagen según la estructura de tu proyecto
                    category: product.product_categories.category,
                    subcategory: product.product_categories.sub_category
                };
                
                return res.status(200).json({
                    ...productData,
                    status: 200
                });
            })
            .catch(error => {
                console.error('Error finding product:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },

    store: (req, res) => {
        db.Product
            .create(req.body)
            .then(product => {
                return res.status(200).json({
                    data: product,
                    status: 200,
                    created: "ok"
                });
            })
            .catch(error => {
                console.error('Error creating product:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    update: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        error: 'Product not found',
                        status: 404
                    });
                }
                product.update(req.body)
                    .then(updatedProduct => {
                        return res.status(200).json({
                            data: updatedProduct,
                            status: 200,
                            message: 'Product updated successfully'
                        });
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                        return res.status(500).json({
                            error: 'Internal Server Error',
                            status: 500
                        });
                    });
            })
            .catch(error => {
                console.error('Error finding product:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
        
    delete: (req, res) => {
        db.Product
            .destroy({
                where: {
                    product_id: req.params.id
                }
            })
            .then(response => {
                return res.json(response);
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    search: (req, res) => {
        db.Product
            .findAll({
                where: {
                    title: {[Op.like]: "%" + req.query.keyword + "%"}
                }
            })
            .then(products => {
                if (products.length > 0) {
                    return res.status(200).json({
                        total: products.length,
                        data: products,
                        status: 200
                    });
                }
                return res.status(200).json("No se encontro ningun producto")
            })
            .catch(error => {
                console.error('Error searching products:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    }  
}

module.exports = productController;