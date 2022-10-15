import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import './scss/style.scss';
import storageApi from './services/storage.service';

function App() {
  const navigate = useNavigate();

  if (!storageApi.hasToken()) {
    navigate('/prijavljivanje');
  }

  return (
    <div className="app">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
