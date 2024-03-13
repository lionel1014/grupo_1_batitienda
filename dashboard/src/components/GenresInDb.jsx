import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const GenresInDb = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    // Hacer la llamada a la API para obtener countByCategory
    fetch('http://localhost:3001/product/api/products')
      .then(response => response.json())
      .then(data => {
        const { countByCategory } = data;
        const counts = Object.entries(countByCategory).map(([category, count]) => ({ category, count }));
        setCategoryCounts(counts);
      })
      .catch(error => console.error('Error fetching category counts:', error));
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      p={2}
    >
      {categoryCounts.map(({ category, count }) => (
        <Card key={category} sx={{ width: 100, backgroundColor: 'white' }}>
          <CardContent>
            <Typography sx={{ fontSize: "20px" }} color="text.secondary" gutterBottom>
              {category}
            </Typography>
            <Typography variant="h5" component="div">
              {count}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default GenresInDb;


