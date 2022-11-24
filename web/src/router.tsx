import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { EditReport } from './pages/EditReport';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { PageForm } from './pages/Pages/Components';
import EditUser from './pages/EditUser';
import Users from './pages/Users';
import Categories from './pages/Categories/Categories';
import ReportsContainer from './pages/Reports/ReportsContainer';
import PagesContainer from './pages/Pages/PagesContainer';

const GlobalRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prijavljivanje" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<App />}>
          <Route path="/prijave" element={<ReportsContainer />} />
          <Route path="/prijave/:id" element={<EditReport />} />
          <Route path="/stranice" element={<PagesContainer />} />
          <Route path="/stranice/kreiranje" element={<PageForm />} />
          <Route path="/korisnici" element={<Users />} />
          <Route path="/korisnici/:id" element={<EditUser />} />
          <Route path="/kategorije" element={<Categories />} />
          <Route path="/" element={<Navigate to="/prijave" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
