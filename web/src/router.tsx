import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';
import Reports from './pages/Reports/Reports';
import Users from './pages/Users/Users';

const GlobalRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/prijavljivanje" element={<Login />} />
                <Route path="/" element={<App />}>
                    <Route path="/prijave" element={<Reports />} />
                    <Route path="/stranice" element />
                    <Route path="/korisnici" element={<Users />} />
                    <Route
                        path="/"
                        element={<Navigate to="/prijave" replace />}
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/prijave" replace />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default GlobalRouter;
