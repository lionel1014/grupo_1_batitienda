const PATH = require('path');
const fs = require('fs');

const productsDB = require("../database/productos.json");
const productsFilePath = PATH.join(__dirname, '../database/productos.json');

const products = {
    getAllProducts: function() {
        return productsDB;
    },

    findProductByRequest : function ({params}){
        const product = productsDB.find(product => product.id == params.id);
        return product;
    },

    findProductBySubcategory : function (subcategoryParams){
        const products = productsDB.filter(product => product.subcategory == subcategoryParams);
        return products;
    },

    findProductRamdom : function (){
        const products = productsDB[0]; //implementar logica ramdon
        return products;
    },

    filterProducts: function(request){
        let productToFilter = productsDB;
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

        return productToFilter;
    },

    saveProduct: function(response, productsPreviousSave, productData = null){
        // Guardar el array actualizado en el archivo
        fs.writeFileSync(productsFilePath, JSON.stringify(productsPreviousSave, null, 2), 'utf-8');
        productData != null ? response.redirect(`/product/${productData?.id}`) : response.redirect(`/`)
    },

    createProduct: function(request, response){
        const { titulo, precio, stock, categoria, subcategoria, descripcion} = request.body;
		
		const newProduct = {
			id: productsDB.length + 1,
			title: titulo,
			price: +precio,
			stock: +stock,
			category: categoria,
            subcategory: subcategoria,
            description: descripcion,
			image: `${request.file?.filename}`
		};
		productsDB.push(newProduct);
        this.saveProduct(response, productsDB, newProduct)
    },

    updateProduct: function(request, response){
        const { titulo, precio, stock, categoria, subcategoria, descripcion } = request.body
        // const productBeforeEdit = products.findProductByRequest(request);
        const { id } = request.params;
        const productID = productsDB.findIndex(product => product.id == id);

        if (productID != -1) {
            try {
                fs.unlinkSync(PATH.join(__dirname, `../public/images/img_products/${productsDB[productID].image}`));
                productsDB[productID].title = titulo;
                productsDB[productID].price = +precio;
                productsDB[productID].stock = +stock;
                productsDB[productID].category = categoria;
                productsDB[productID].subcategory = subcategoria;
                productsDB[productID].description = descripcion;
                productsDB[productID].image = `${request.file?.filename}`;

                this.saveProduct(response, productsDB, productsDB[productID])

            } catch (error) {
                console.error(`Error al eliminar la imagen anterior: ${error?.message} y ${productID.image}`);
                response.send("update fallido ❤️")
            }
        }else{
            response.send("no se encontro el producto a editar")
        }
    },

    deleteProduct: function (request, response){
        const productId = request.params.id;
        const productArrayID = productsDB.findIndex(product => product.id == productId);

        try {
            const restProducts = productsDB.filter(product => product.id != productId);

            if (restProducts.length === productsDB.length) {
                throw new Error("Producto no encontrado");
            }

            fs.unlinkSync(PATH.join(__dirname, `../public/images/img_products/${productsDB[productArrayID].image}`));
            this.saveProduct(response,restProducts);

        } catch (error) {
            response.status(404).send(error)
        }
    }
}

module.exports = products