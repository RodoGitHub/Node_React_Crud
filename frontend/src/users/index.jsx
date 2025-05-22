import { Routes, Route } from 'react-router-dom';
import UserProvider from './UsersProvider';
import UsersView from './UsersView';
import UsersForm from './UsersForm';
import UserLogin from './UserLogin';
import LayoutView from '../layout/Layout';

const UserRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        {/* Rutas con navbar */}
        <Route path="/" element={<LayoutView />}>
          <Route path="lista" element={<UsersView />} />
          <Route path="editar/:id" element={<UsersForm />} />
          <Route path="form" element={<UsersForm />} /> 
        </Route>

        {/* Ruta sin navbar */}
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </UserProvider>
  );
};

export default UserRoutes;