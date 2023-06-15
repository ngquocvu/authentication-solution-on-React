import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import IndexPage from '../pages';
import PageNotFound from '../pages/404';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import PrivateRoute from './PrivateRoute';

const RouteProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteProvider;
