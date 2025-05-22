import { Routes, Route } from 'react-router-dom';
import HomeView from './Home';
import GlobalProvider from '../context/GlobalProvider';
import LayoutView from '../layout/Layout';

const HomeRoutes = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<LayoutView />}>
          <Route path="/" element={<HomeView />} />
        </Route>
      </Routes>
    </GlobalProvider>
  );
};

export default HomeRoutes;
