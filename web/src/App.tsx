import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Sidebar from './shared/Sidebar';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Sidebar />
                <main className="app__content">
                    <Outlet />
                </main>
            </div>
        </QueryClientProvider>
    );
}

export default App;
