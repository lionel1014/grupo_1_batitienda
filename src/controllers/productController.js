const fs = require('fs');
const PATH = require('path');
const productsDB = require("../database/productos.json");
const products = require("../helpers/productsFuntions");

const productsFilePath = PATH.join(__dirname, '../database/productos.json');

const productController = {

    index: function(request, response){
        const productSelected = products.findProductByRequest(request);
        response.render("product/productDetail",{product: productSelected, title: ''})
    },

    productCar: function(request, response){
        response.render("product/productCar")
    },

    createProduct: function(request, response){
        response.render("product/createProduct", {title: '- crear producto'})
    },

    create: function(request,response){
        const { titulo, precio, stock, categoria, subcategoria, descripcion} = request.body;
		
		const newProduct = {
			id: productsDB.length + 1,
			title: titulo,
			price: precio,
			stock,
			category: categoria,
            subcategory: subcategoria,
            description: descripcion,
			image: `/images/img_products/${request.file?.filename}`
		};
		productsDB.push(newProduct);

		// Guardar el array actualizado en el archivo
		fs.writeFileSync(productsFilePath, JSON.stringify(productsDB, null, 2), 'utf-8');

		response.redirect(`/product/${newProduct.id}`);
    },

    editProduct: function(request, response){
        const product = products.findProductByRequest(request);

        response.render("product/editProduct",{product})
    },

    update:function(request,response){
        const productBeforeEdit = products.findProductByRequest(request);
        response.send("update ❤️")
    },

    productList: function(request, response){
        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products: productsDB, title: ''});
            return;
        }
        let productToFilter = productsDB

        const {category, subcategory, price} = request.query

        if(category){
            productToFilter = productToFilter.filter(producto => producto.category == category)
        }
        if(subcategory){
            productToFilter = productToFilter.filter(producto => producto.subcategory == subcategory)
        }
        if(price){
            productToFilter = productToFilter.filter(producto => producto.price == price)
        }
        response.render("product/productList",{products: productToFilter, title: ''});

    }
}

module.exports = productController;