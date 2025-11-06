import React from 'react';
import { Prediction, PredictionStatus, PredictionType } from '../types';
import PredictionCard from './PredictionCard';
import CombinedCouponCard from './CombinedCouponCard';

interface PredictionListProps {
  predictions: Prediction[];
  totalCountInView: number;
  onUpdateStatus: (id: string, status: PredictionStatus) => void;
  onDelete: (id: string) => void;
  onUpdateBetStatus: (couponId: string, betIndex: number, status: PredictionStatus) => void;
  onEdit: (prediction: Prediction) => void;
  isAdmin: boolean;
}

const PredictionList: React.FC<PredictionListProps> = ({ predictions, totalCountInView, onUpdateStatus, onDelete, onUpdateBetStatus, onEdit, isAdmin }) => {
  if (predictions.length === 0) {
    if (totalCountInView > 0) {
       return (
        <div className="text-center py-12 bg-gray-800 rounded-xl">
          <h3 className="text-xl text-gray-400">Bu filtreyle eşleşen bir tahmin bulunamadı.</h3>
          <p className="text-gray-500 mt-2">Filtre seçeneklerini değiştirmeyi deneyin.</p>
        </div>
      );
    }
    return (
      <div className="text-center py-12 bg-gray-800 rounded-xl">
        <h3 className="text-xl text-gray-400">Bu bölümde henüz yayınlanmış bir tahmin yok.</h3>
        {isAdmin && <p className="text-gray-500 mt-2">Yukarıdaki panelden yeni bir tahmin ekleyebilirsiniz.</p>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {predictions.map(prediction => {
        if (prediction.type === PredictionType.Live) {
          return (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onEdit={onEdit}
              isAdmin={isAdmin}
            />
          );
        }
        if (prediction.type === PredictionType.Combined) {
          return (
             <CombinedCouponCard
              key={prediction.id}
              coupon={prediction}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onUpdateBetStatus={onUpdateBetStatus}
              onEdit={onEdit}
              isAdmin={isAdmin}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default PredictionList;
