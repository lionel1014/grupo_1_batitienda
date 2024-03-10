import React, { useState, useEffect } from 'react';

function LastCreatedInfo() {
  const [lastUser, setLastUser] = useState(null);
  const [lastProduct, setLastProduct] = useState(null);

  useEffect(() => {

    fetch('/api/users')
      .then(response => response.json())
      .then(users => {

        const latestUser = users.reduce((prevUser, currentUser) => {
          return prevUser.id > currentUser.id ? prevUser : currentUser;
        });
        setLastUser(latestUser);
      })
      .catch(error => console.error('Error fetching users:', error));

    fetch('/api/products')
      .then(response => response.json())
      .then(products => {

        const latestProduct = products.reduce((prevProduct, currentProduct) => {
          return prevProduct.id > currentProduct.id ? prevProduct : currentProduct;
        });
        setLastProduct(latestProduct);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Última información creada:</h2>
      {lastUser && (
        <div>
          <h3>Último usuario:</h3>
          <p>Nombre: {lastUser.name}</p>
          <p>Correo: {lastUser.email}</p>
          <p>...</p>
        </div>
      )}
      {lastProduct && (
        <div>
          <h3>Último producto:</h3>
          <p>Nombre: {lastProduct.name}</p>
          <p>Precio: {lastProduct.price}</p>
          <p>...</p>
        </div>
      )}
    </div>
  );
}

export default LastCreatedInfo;
