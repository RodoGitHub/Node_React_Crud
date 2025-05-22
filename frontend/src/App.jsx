import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';
import UserRoutes from './users/index';
import ProductRoutes from './products/index';
import HomeRoutes from './home/index';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/usuarios/*" element={<UserRoutes />} />
          <Route path="/productos/*" element={<ProductRoutes />} />
          <Route path="/*" element={<HomeRoutes />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
