import React from 'react';
import { CombinedCoupon, PredictionStatus } from '../types';

interface CombinedCouponCardProps {
  coupon: CombinedCoupon;
  onUpdateStatus: (id: string, status: PredictionStatus) => void;
  onDelete: (id: string) => void;
  onUpdateBetStatus: (couponId: string, betIndex: number, status: PredictionStatus) => void;
  onEdit: (coupon: CombinedCoupon) => void;
}

const statusStyles = {
  [PredictionStatus.Pending]: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  [PredictionStatus.Won]: 'bg-green-500/20 border-green-500 text-green-400',
  [PredictionStatus.Lost]: 'bg-red-500/20 border-red-500 text-red-400',
};

const betStatusBackground = {
  [PredictionStatus.Pending]: 'bg-gray-700/50',
  [PredictionStatus.Won]: 'bg-green-500/20',
  [PredictionStatus.Lost]: 'bg-red-500/20',
}

const StatusBadge: React.FC<{ status: PredictionStatus }> = ({ status }) => {
  const style = statusStyles[status];
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style} whitespace-nowrap`}>
      {status}
    </span>
  );
};

const CombinedCouponCard: React.FC<CombinedCouponCardProps> = ({ coupon, onUpdateStatus, onDelete, onUpdateBetStatus, onEdit }) => {
  const baseCardStyle = "bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-1 flex flex-col";
  const borderStyle = {
    [PredictionStatus.Pending]: 'border-t-4 border-yellow-500',
    [PredictionStatus.Won]: 'border-t-4 border-green-500',
    [PredictionStatus.Lost]: 'border-t-4 border-red-500',
  };

  return (
    <div className={`${baseCardStyle} ${borderStyle[coupon.status]}`}>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-cyan-400">{coupon.title}</h3>
          <StatusBadge status={coupon.status} />
        </div>
         <p className="text-xs text-gray-500 mb-4">
            {new Date(coupon.timestamp).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
        </p>
        <div className="space-y-2 flex-grow">
          {coupon.bets.map((bet, index) => (
            <div key={index} className={`p-2 rounded-md transition-colors ${betStatusBackground[bet.status]}`}>
               <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{bet.league}</p>
               <div className="flex justify-between items-center mt-1">
                 <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 truncate">{bet.homeTeam} - {bet.awayTeam}</p>
                    <p className="text-sm font-bold text-cyan-300">{bet.prediction} @{bet.odds.toFixed(2)}</p>
                 </div>
                 {coupon.status === PredictionStatus.Pending && (
                    <div className="flex space-x-1 ml-2 flex-shrink-0">
                        <button onClick={() => onUpdateBetStatus(coupon.id, index, PredictionStatus.Won)} className="w-5 h-5 text-xs bg-green-600 hover:bg-green-700 rounded-full text-white flex items-center justify-center font-bold">✓</button>
                        <button onClick={() => onUpdateBetStatus(coupon.id, index, PredictionStatus.Lost)} className="w-5 h-5 text-xs bg-red-600 hover:bg-red-700 rounded-full text-white flex items-center justify-center font-bold">✕</button>
                    </div>
                 )}
              </div>
            </div>
          ))}
        </div>
         <div className="bg-gray-700/50 px-5 py-4 mt-4 rounded-md">
           <div className="flex justify-around items-center text-center">
              <div>
                  <p className="text-sm text-gray-400">Toplam Oran</p>
                  <p className="text-lg font-bold text-cyan-400">{coupon.totalOdds?.toFixed(2) || 'N/A'}</p>
              </div>
              <div className="text-center">
                  <p className="text-sm text-gray-400">Potansiyel Kazanç</p>
                  <p className="text-lg font-bold text-green-400">{coupon.potentialWinnings?.toFixed(2) || 'N/A'} TL</p>
                  <p className="text-xs text-gray-500 mt-1">(100 TL'lik bahise göre)</p>
              </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 flex justify-end space-x-2">
        {coupon.status === PredictionStatus.Pending ? (
          <>
            <button
              onClick={() => onUpdateStatus(coupon.id, PredictionStatus.Won)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
              aria-label="Kazandı olarak işaretle"
            >
              Kazandı
            </button>
            <button
              onClick={() => onUpdateStatus(coupon.id, PredictionStatus.Lost)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              aria-label="Kaybetti olarak işaretle"
            >
              Kaybetti
            </button>
          </>
        ) : (
            <button
              onClick={() => onUpdateStatus(coupon.id, PredictionStatus.Pending)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md transition"
              aria-label="Durumu geri al"
            >
              Geri Al
            </button>
        )}
        <button
          onClick={() => onEdit(coupon)}
          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          aria-label="Kuponu düzenle"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(coupon.id)}
          className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition"
          aria-label="Kuponu sil"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default CombinedCouponCard;