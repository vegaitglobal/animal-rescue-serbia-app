import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import './scss/style.scss';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
