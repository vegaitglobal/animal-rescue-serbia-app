import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import './scss/style.scss';

function App() {
    return (
        <div className="app">
            <Sidebar />
            <main className="app__content">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
