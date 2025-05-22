import { Routes, Route } from 'react-router-dom';
import ProductProvider from './ProductsProvider';
import ProductsView from './ProductsView';
import ProductsForm from './ProductsForm';
import LayoutView from '../layout/Layout';

const ProductRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<LayoutView />}>
          <Route path="/" element={<ProductsView />} />
          <Route path="/editar/:id" element={<ProductsForm />} />
          <Route path="/form" element={<ProductsForm />} /> 
        </Route>
      </Routes>
    </ProductProvider>
  );
};

export default ProductRoutes;
