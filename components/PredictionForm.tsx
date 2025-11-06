import React, { useState, useEffect } from 'react';
import { LivePrediction } from '../types';

interface PredictionFormProps {
  onSubmit: (league: string, homeTeam: string, awayTeam: string, prediction: string, minute: string) => void;
  initialData?: LivePrediction | null;
  onCancel?: () => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [league, setLeague] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [prediction, setPrediction] = useState('');
  const [minute, setMinute] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing && initialData) {
      setLeague(initialData.league);
      setHomeTeam(initialData.homeTeam);
      setAwayTeam(initialData.awayTeam);
      setPrediction(initialData.prediction);
      setMinute(initialData.minute);
    }
  }, [initialData, isEditing]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!league.trim() || !homeTeam.trim() || !awayTeam.trim() || !prediction.trim() || !minute.trim()) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    onSubmit(league, homeTeam, awayTeam, prediction, minute);
    if (!isEditing) {
        setLeague('');
        setHomeTeam('');
        setAwayTeam('');
        setPrediction('');
        setMinute('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div>
          <label htmlFor="league" className="block text-sm font-medium text-gray-400 mb-1">
            Lig (Örn: Süper Lig)
          </label>
          <input
            type="text"
            id="league"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            placeholder="Lig adını girin"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-400 mb-1">
            Ev Sahibi
          </label>
          <input
            type="text"
            id="homeTeam"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            placeholder="Ev sahibi takımı girin"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        <div>
          <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-400 mb-1">
            Deplasman
          </label>
          <input
            type="text"
            id="awayTeam"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            placeholder="Deplasman takımını girin"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prediction" className="block text-sm font-medium text-gray-400 mb-1">
            Tahmin (Örn: MS 1)
          </label>
          <input
            type="text"
            id="prediction"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            placeholder="Tahmininizi girin"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        <div>
          <label htmlFor="minute" className="block text-sm font-medium text-gray-400 mb-1">
            Dakika (Örn: 24)
          </label>
          <input
            type="text"
            id="minute"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="Maçın dakikası"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-2 space-x-2">
        {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                className="w-full md:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md shadow-lg"
            >
                İptal
            </button>
        )}
        <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-transform transform hover:scale-105"
        >
            {isEditing ? 'Tahmini Güncelle' : 'Tahmini Yayınla'}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;