import { GlobalContext } from './GlobalContext';
import { removeLastObjectId } from '../hooks/localStorage';
import { useNavigate } from 'react-router-dom';

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    removeLastObjectId("userLogin")
    navigate("/")
  }
  
  return (
    <GlobalContext.Provider value={{  
      handleLogout,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
