import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#34A853" d="M43.611,20.083L43.595,20.083L42,20H24v8h11.303c-0.792,2.447-2.24,4.477-4.24,5.922l5.657,5.657C39.421,35.698,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FBBC05" d="M10.222,28.422l5.657,5.657c2.019,1.444,4.464,2.27,7.121,2.27c2.22,0,4.252-0.568,6.024-1.581l-5.657-5.657c-1.326,0.876-2.907,1.41-4.667,1.41C14.73,30.432,12.118,29.74,10.222,28.422z"></path>
        <path fill="#EA4335" d="M24,16c-2.22,0-4.252,0.568-6.024,1.581l5.657,5.657c1.326-0.876,2.907-1.41,4.667-1.41c2.657,0,5.269,0.692,7.165,1.998l5.657-5.657C34.046,13.947,29.268,12,24,12z"></path>
        <path fill="none" d="M4,4h40v40H4z"></path>
    </svg>
);

const LoginPage: React.FC = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        return null; // or a loading indicator
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md text-center">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        🏆 Canlı Maç Tahminleri
                    </h1>
                    <p className="text-gray-400 mt-3">Devam etmek için giriş yapın.</p>
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
                    <button
                        onClick={auth.loginWithGoogle}
                        className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        <GoogleIcon />
                        Google ile Giriş Yap
                    </button>
                </div>
                
                <p className="text-center text-gray-600 text-xs mt-8">
                    Giriş yaparak kullanım koşullarını kabul etmiş sayılırsınız.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
