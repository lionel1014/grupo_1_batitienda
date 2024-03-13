// import React from 'react';
// import SmallCard from './SmallCard';

// /*  Cada set de datos es un objeto literal */

// /* <!-- Movies in DB --> */

// let moviesInDB = {
//     title: 'Productos en Base de Datos',
//     color: 'primary', 
//     cuantity: 21,
//     icon: 'fa-clipboard-list'
// }

// /* <!-- Total awards --> */

// let totalAwards = {
//     title:' Total de Categorias', 
//     color:'success', 
//     cuantity: '79',
//     icon:'fa-award'
// }

// /* <!-- Actors quantity --> */

// let actorsQuantity = {
//     title:'Usuarios en Base de Datos' ,
//     color:'warning',
//     cuantity:'49',
//     icon:'fa-user-check'
// }

// let cartProps = [moviesInDB, totalAwards, actorsQuantity];

// function ContentRowMovies(){
//     return (
    
//         <div className="row">
            
//             {cartProps.map( (movie, i) => {

//                 return <SmallCard {...movie} key={i}/>
            
//             })}

//         </div>
//     )
// }

// export default ContentRowMovies;

import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(){

    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch('http://localhost:3001/product/api/products');
                const data = await response.json();
                setProductCount(data.count);
            } catch (error) {
                console.error('Error fetching product count:', error);
            }
        };

        const fetchUserCount = async () => {
            try {
                const response = await fetch('http://localhost:3001/user/api/users');
                const data = await response.json();
                setUserCount(data.count);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        const fetchCategoryCount = async () => {
            try {
                const response = await fetch('http://localhost:3001/product/api/products');
                const data = await response.json();
                setCategoryCount(data.categoryCount);
            } catch (error) {
                console.error('Error fetching category count:', error);
            }
        };

        fetchProductCount();
        fetchUserCount();
        fetchCategoryCount();
    }, []);

    return (
        <div className="row">
            <SmallCard title="Total de productos" color="primary" cuantity={productCount} icon="fa-box" />
            <SmallCard title="Total de usuarios" color="warning" cuantity={userCount} icon="fa-user" />
            <SmallCard title="Total de categorías" color="success" cuantity={categoryCount} icon="fa-tags" />
        </div>
    );
}

export default ContentRowMovies;
