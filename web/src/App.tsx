import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import './scss/style.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Sidebar />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
