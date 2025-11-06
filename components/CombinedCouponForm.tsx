import React, { useState, useEffect, useMemo } from 'react';
import { Bet, CombinedCoupon } from '../types';

interface CombinedCouponFormProps {
    onSubmit: (title: string, bets: Omit<Bet, 'status'>[]) => void;
    initialData?: CombinedCoupon | null;
    onCancel?: () => void;
}

const CombinedCouponForm: React.FC<CombinedCouponFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [title, setTitle] = useState('');
    const [bets, setBets] = useState<Omit<Bet, 'status'>[]>([]);
    const [currentBet, setCurrentBet] = useState({ league: '', homeTeam: '', awayTeam: '', prediction: '', odds: '' });

    const isEditing = !!initialData;

    useEffect(() => {
        if (isEditing && initialData) {
            setTitle(initialData.title);
            const initialBets = initialData.bets.map(({ status, ...rest }) => rest);
            setBets(initialBets);
        }
    }, [initialData, isEditing]);


    const handleCurrentBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBet({ ...currentBet, [e.target.name]: e.target.value });
    };

    const handleAddBet = () => {
        const oddsValue = parseFloat(currentBet.odds.replace(',', '.'));
        if (!currentBet.league.trim() || !currentBet.homeTeam.trim() || !currentBet.awayTeam.trim() || !currentBet.prediction.trim()) {
            alert('Lütfen maç bilgilerini eksiksiz doldurun.');
            return;
        }
        if (isNaN(oddsValue) || oddsValue <= 1) {
            alert('Lütfen geçerli bir oran girin (1\'den büyük).');
            return;
        }

        setBets([...bets, { ...currentBet, odds: oddsValue }]);
        setCurrentBet({ league: '', homeTeam: '', awayTeam: '', prediction: '', odds: '' });
    };

    const handleRemoveBet = (index: number) => {
        setBets(bets.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || bets.length === 0) {
            alert('Lütfen kupon başlığını girin ve en az bir maç ekleyin.');
            return;
        }
        onSubmit(title, bets);
        if (!isEditing) {
            setTitle('');
            setBets([]);
        }
    };
    
    const { totalOdds, potentialWinnings } = useMemo(() => {
        const total = bets.reduce((acc, bet) => acc * bet.odds, 1);
        return {
            totalOdds: total,
            potentialWinnings: total * 100,
        };
    }, [bets]);

    const inputClass = "w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                    Kupon Başlığı
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn: Günün Banko Kuponu"
                    className={inputClass}
                />
            </div>

            <div className="space-y-4 p-4 border border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Maç Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="league" value={currentBet.league} onChange={handleCurrentBetChange} placeholder="Lig" className={inputClass} />
                    <input name="homeTeam" value={currentBet.homeTeam} onChange={handleCurrentBetChange} placeholder="Ev Sahibi" className={inputClass} />
                    <input name="awayTeam" value={currentBet.awayTeam} onChange={handleCurrentBetChange} placeholder="Deplasman" className={inputClass} />
                    <input name="prediction" value={currentBet.prediction} onChange={handleCurrentBetChange} placeholder="Tahmin" className={inputClass} />
                    <input name="odds" value={currentBet.odds} onChange={handleCurrentBetChange} type="text" placeholder="Oran (örn: 1.85)" className={inputClass} />
                </div>
                 <div className="flex justify-end mt-4">
                    <button type="button" onClick={handleAddBet} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105">
                        Maçı Ekle
                    </button>
                </div>
            </div>

            {bets.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-md font-semibold text-gray-300">Eklenen Maçlar:</h4>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                        {bets.map((bet, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md">
                                <span className="text-sm text-gray-200">{bet.homeTeam} - {bet.awayTeam} ({bet.prediction}) - <strong>{bet.odds.toFixed(2)}</strong></span>
                                <button type="button" onClick={() => handleRemoveBet(index)} className="text-red-400 hover:text-red-300 text-xs font-semibold">
                                    KALDIR
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-md flex justify-around text-center mt-2">
                        <div>
                            <p className="text-sm text-gray-400">Toplam Oran</p>
                            <p className="text-lg font-bold text-cyan-400">{totalOdds.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Potansiyel Kazanç (100 TL)</p>
                            <p className="text-lg font-bold text-green-400">{potentialWinnings.toFixed(2)} TL</p>
                        </div>
                    </div>
                </div>
            )}

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
                <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-transform transform hover:scale-105">
                     {isEditing ? 'Kuponu Güncelle' : 'Kuponu Yayınla'}
                </button>
            </div>
        </form>
    );
};

export default CombinedCouponForm;