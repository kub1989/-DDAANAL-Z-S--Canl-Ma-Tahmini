import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
    const auth = useContext(AuthContext);

    if (!auth) return null;
    const { user, logout } = auth;

    return (
        <header className="bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-4 md:px-6 flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    🏆 Canlı Maç Tahminleri
                </h1>
                <div className="flex items-center space-x-4">
                    {user && (
                         <div className="text-right">
                            <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
                         </div>
                    )}
                    {user && (
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md text-sm transition-colors"
                        >
                            Çıkış Yap
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
