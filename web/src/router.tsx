import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';
import Reports from './pages/Reports/Reports';
import Users from './pages/Users/Users';

const GlobalRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/prijavljivanje" element={<Login />} />
                    <Route path="/prijave" element={<Reports />} />
                    <Route path="/stranice" element />
                    <Route path="/korisnici" element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default GlobalRouter;
