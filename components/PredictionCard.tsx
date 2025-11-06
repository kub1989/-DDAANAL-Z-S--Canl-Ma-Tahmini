import React from 'react';
import { LivePrediction, PredictionStatus } from '../types';

interface PredictionCardProps {
  prediction: LivePrediction;
  onUpdateStatus: (id:string, status: PredictionStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (prediction: LivePrediction) => void;
}

const statusStyles = {
  [PredictionStatus.Pending]: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  [PredictionStatus.Won]: 'bg-green-500/20 border-green-500 text-green-400',
  [PredictionStatus.Lost]: 'bg-red-500/20 border-red-500 text-red-400',
};

const StatusBadge: React.FC<{ status: PredictionStatus }> = ({ status }) => {
  const style = statusStyles[status];
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style}`}>
      {status}
    </span>
  );
};

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, onUpdateStatus, onDelete, onEdit }) => {
  const baseCardStyle = "bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-1 flex flex-col";
  const borderStyle = {
    [PredictionStatus.Pending]: 'border-t-4 border-yellow-500',
    [PredictionStatus.Won]: 'border-t-4 border-green-500',
    [PredictionStatus.Lost]: 'border-t-4 border-red-500',
  }
  
  return (
    <div className={`${baseCardStyle} ${borderStyle[prediction.status]}`}>
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{prediction.league}</p>
            <StatusBadge status={prediction.status} />
        </div>
        <h3 className="text-xl font-bold text-gray-100 truncate">{prediction.homeTeam} - {prediction.awayTeam}</h3>
        {prediction.timestamp && (
           <p className="text-xs text-gray-500 mt-1">
             {new Date(prediction.timestamp).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
             })}
           </p>
        )}
      </div>
      <div className="bg-gray-700/50 px-5 py-4">
         <div className="flex justify-around items-center text-center">
            <div>
                <p className="text-sm text-gray-400">Tahmin</p>
                <p className="text-lg font-bold text-cyan-400">{prediction.prediction}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">Dakika</p>
                <p className="text-lg font-bold text-cyan-400">{prediction.minute}'</p>
            </div>
        </div>
      </div>
      <div className="p-4 bg-gray-800 flex justify-end space-x-2">
         {prediction.status === PredictionStatus.Pending ? (
            <>
                 <button
                    onClick={() => onUpdateStatus(prediction.id, PredictionStatus.Won)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
                    aria-label="Kazandı olarak işaretle"
                >
                    Kazandı
                </button>
                <button
                    onClick={() => onUpdateStatus(prediction.id, PredictionStatus.Lost)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
                    aria-label="Kaybetti olarak işaretle"
                >
                    Kaybetti
                </button>
            </>
         ) : (
            <button
                onClick={() => onUpdateStatus(prediction.id, PredictionStatus.Pending)}
                className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md transition"
                aria-label="Durumu geri al"
            >
                Geri Al
            </button>
         )}
         <button
            onClick={() => onEdit(prediction)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            aria-label="Tahmini düzenle"
        >
            Düzenle
        </button>
         <button
            onClick={() => onDelete(prediction.id)}
            className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition"
            aria-label="Tahmini sil"
        >
            Sil
        </button>
      </div>
    </div>
  );
};

export default PredictionCard;