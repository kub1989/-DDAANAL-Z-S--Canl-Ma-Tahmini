import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Yükleniyor...</div>; // Veya bir yükleme göstergesi
  }
  
  const { user, loading } = auth;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <>
      {user ? <AdminDashboard /> : <LoginPage />}
    </>
  );
};

export default App;