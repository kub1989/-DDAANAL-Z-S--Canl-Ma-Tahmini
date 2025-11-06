import React from 'react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

const accounts = [
  {
    name: 'Tarık Kulu',
    email: 'ktarikulu@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ9... (Örnek bir avatar URLsi)' // Gerçek URL kullanılabilir
  },
  {
    name: 'Normal Kullanıcı',
    email: 'kullanici@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ9... (Örnek bir avatar URLsi)'
  }
];

const UserAvatar: React.FC<{ name: string }> = ({ name }) => (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4">
        {name.charAt(0).toUpperCase()}
    </div>
);


const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-sm transform transition-transform duration-300 scale-95 animate-scale-in text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-center flex-col">
                <svg className="w-8 h-8 text-gray-600" viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#34A853" d="M43.611,20.083L43.595,20.083L42,20H24v8h11.303c-0.792,2.447-2.24,4.477-4.24,5.922l5.657,5.657C39.421,35.698,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FBBC05" d="M10.222,28.422l5.657,5.657c2.019,1.444,4.464,2.27,7.121,2.27c2.22,0,4.252-0.568,6.024-1.581l-5.657-5.657c-1.326,0.876-2.907,1.41-4.667,1.41C14.73,30.432,12.118,29.74,10.222,28.422z"></path><path fill="#EA4335" d="M24,16c-2.22,0-4.252,0.568-6.024,1.581l5.657,5.657c1.326-0.876,2.907-1.41,4.667-1.41c2.657,0,5.269,0.692,7.165,1.998l5.657-5.657C34.046,13.947,29.268,12,24,12z"></path><path fill="none" d="M4,4h40v40H4z"></path>
                </svg>
                <h2 className="text-xl font-semibold mt-2">Bir hesap seçin</h2>
                <p className="text-sm text-gray-500">tahminsitesi.com adresine devam etmek için</p>
            </div>
        </div>
        <div className="py-2">
            {accounts.map((account) => (
                <div 
                    key={account.email} 
                    className="flex items-center px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => onLogin(account.email)}
                >
                    <UserAvatar name={account.name} />
                    <div>
                        <p className="font-semibold">{account.name}</p>
                        <p className="text-sm text-gray-600">{account.email}</p>
                    </div>
                </div>
            ))}
             <div 
                className="flex items-center px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={onClose}
            >
                <div className="w-10 h-10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <p className="font-semibold">Başka bir hesap kullan</p>
                </div>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GoogleLoginModal;
