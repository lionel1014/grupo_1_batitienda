import React, { useState, useEffect } from 'react';

function LastCreatedInfo() {
  const [lastProduct, setLastProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/product/api/products')
      .then(response => response.json())
      .then(data => {
        // Verificamos que la propiedad "products" exista en la respuesta
        if (data && Array.isArray(data.products)) {
          // Ordenamos los productos por fecha de creación descendente
          data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // Seleccionamos el primer producto (el más reciente)
          const latestProduct = data.products.length > 0 ? data.products[0] : null;
          setLastProduct(latestProduct);
        } else {
          console.error('Error fetching products: Invalid data format');
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Ultimo Producto Creado</h5>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '20rem' }} src={lastProduct ? `http://localhost:3001/images/img_products/${lastProduct.image}` : ''} alt="Last Product"/>
            </div>
            {lastProduct && (
              <>
                <p>Nombre: {lastProduct.name}</p>
                <p>Description: {lastProduct.description}</p>
                <a className="btn btn-danger" rel="noreferrer" target="_blank" href={`http://localhost:3001/product/${lastProduct.id}`}>Detalle</a>
              </>
            )}
          </div>
        </div>
      </div>
    );
    
}

export default LastCreatedInfo;
