import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { ArticlesPage } from './pages/Articles';
import { ArticleEditForm, ArticleForm } from './pages/Articles/Components';
import Categories from './pages/Categories/Categories';
import { EditReport } from './pages/EditReport';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ReportsContainer from './pages/Reports/ReportsContainer';
import Users from './pages/Users';
import jwtTokenApi from './services/jwt.service';
import ArticleCategories from './pages/ArticleCategories/ArticleCategories';

const GlobalRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prijavljivanje" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<App />}>
          <Route path="/prijave" element={<ReportsContainer />} />
          <Route path="/prijave/:id" element={<EditReport />} />
          <Route
            path="/korisnici"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/korisnici/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route path="/stranice" element={<ArticlesPage />} />
          <Route path="/stranice/kreiranje" element={<ArticleForm />} />
          <Route path="/stranice/:id" element={<ArticleEditForm />} />
          <Route path="/korisnici" element={<Users />} />
          <Route path="/korisnici/:id" element={<EditUser />} />
          <Route path="/kategorije" element={<Categories />} />
          <Route path="/kategorije-stranice" element={<ArticleCategories />} />
          <Route path="/" element={<Navigate to="/prijave" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const isAdmin = jwtTokenApi.isAdmin();
  if (!isAdmin) {
    return <Navigate to={'/prijave'} replace />;
  }

  return children;
};

export default GlobalRouter;
