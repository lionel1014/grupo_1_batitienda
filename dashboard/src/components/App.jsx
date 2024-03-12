import React from 'react';
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import { Route, Routes } from 'react-router-dom';

import GenresInDb from './GenresInDb';
import LastMovieInDb from './LastMovieInDb';
import ContentRowMovies from './ContentRowMovies';
import ErrorPage from './ErrorPage';
import { Button, Stack } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />

        <Routes>
          <Route path="/" element={<ContentWrapper />} />
          <Route path="/genero" element={<GenresInDb />} />
          <Route path="/peli" element={<LastMovieInDb />} />
          <Route path="/tabla" element={<ContentRowMovies />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
