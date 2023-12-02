const fs = require('fs');
const PATH = require('path');
const products = require("../database/productos.json");
const productsFilePath = PATH.join(__dirname, '../database/productos.json');

const productController = {
    index: function(request, response){
        const productSelected = products.find(product => product.id == request.params.id)
        response.render("product/productDetail",{product: productSelected})
    },
    productCar: function(request, response){
        response.render("product/productCar")
    },
    createProduct: function(request, response){
        response.render("product/createProduct")
    },
    create: function(request,response){
        const { titulo, precio, stock, categoria, subcategoria, descripcion} = request.body;
		
		const newProduct = {
			id: products.length + 1,
			tittle: titulo,
			price: precio,
			stock,
			category: categoria,
            subcategory: subcategoria,
            description: descripcion,
			image: `/images/img_products/${request.file?.filename}`
		};
		products.push(newProduct);

		// Guardar el array actualizado en el archivo
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

		response.redirect(`/product/${newProduct.id}`);
    },
    editProduct: function(request, response){
        response.render("product/editProduct")
    },
    productList: function(request, response){
        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products});
            return;
        }
        let productToFilter = products

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
        response.render("product/productList",{products: productToFilter});

    }
}

module.exports = productController;