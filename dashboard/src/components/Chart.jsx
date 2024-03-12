import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


const Chart = () => {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => console.log(data));

    const [rowData, setRowData] = useState([
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
        { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
        { make: 'Fiat', model: '500', price: 15774, electric: false },
        { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [columnDefs, setColumnDefs] = useState([
        { field: "make", flex: 2 }, //This column will be twice as wide as the others
        { field: "model", flex: 1 },
        { field: "price", flex: 1 },
        { field: "electric", flex: 1 }
    ]);

    return (
        <div className={"Lionel"} style={{ width: '100%', height: '200px' }}>
            <div className={"ag-theme-quartz"} style={{ width: '100%', height: '100%' }}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs} />
            </div>
        </div>
    );
}

export default Chart;