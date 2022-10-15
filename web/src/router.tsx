import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { EditReport } from './pages/EditReport';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Pages from './pages/Pages';
import { PageForm } from './pages/Pages/Components';
import Reports from './pages/Reports';
import Users from './pages/Users';

const GlobalRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prijavljivanje" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<App />}>
          <Route path="/prijave" element={<Reports />} />
          <Route path="/prijave/edit" element={<EditReport />} />
          <Route path="/stranice" element={<Pages />} />
          <Route path="/stranice/kreiranje" element={<PageForm />} />
          <Route path="/korisnici" element={<Users />} />
          <Route path="/" element={<Navigate to="/prijave" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
