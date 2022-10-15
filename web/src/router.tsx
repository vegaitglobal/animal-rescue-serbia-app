import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Users from './pages/Users';

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
