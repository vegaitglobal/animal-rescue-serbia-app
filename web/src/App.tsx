import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Sidebar from './shared/Sidebar/Sidebar';

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
