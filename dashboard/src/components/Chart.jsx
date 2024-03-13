import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const Chart = () => {
    // Estado para almacenar los datos de los productos
    const [productData, setProductData] = useState([]);

    // Column Definitions
    const columnDefs = [
        { headerName: 'ID', field: 'id', flex: 1 },
        { headerName: 'Nombre', field: 'name', flex: 1 },
        { headerName: 'Descripción', field: 'description', flex: 2 },
        { headerName: 'Categoría', field: 'category', flex: 1 },
    ];

    useEffect(() => {
        // Fetching data from the product API
        fetch('http://localhost:3001/product/api/products/')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.products)) {
                    // Actualizar el estado con los datos de los productos
                    setProductData(data.products);
                } else {
                    console.error('Error fetching product data: Invalid format');
                }
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, []);

    return (
        <div className="Lionel" style={{ width: '100%', height: '200px' }}>
            <div className="ag-theme-quartz" style={{ width: '100%', height: '100%' }}>
                <AgGridReact rowData={productData} columnDefs={columnDefs} />
            </div>
        </div>
    );
}

export default Chart;
