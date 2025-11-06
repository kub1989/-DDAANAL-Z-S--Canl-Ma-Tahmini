import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import CombinedCouponForm from './components/CombinedCouponForm';
import PredictionList from './components/PredictionList';
import Modal from './components/Modal';
import { Prediction, PredictionStatus, PredictionType, Bet, LivePrediction, CombinedCoupon } from './types';

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>(() => {
    try {
      const savedPredictions = localStorage.getItem('predictions');
      if (savedPredictions) {
        let parsed = JSON.parse(savedPredictions);
        // Yeni veri yapısını (type özelliği) kontrol et, yoksa eski veriyi sil
        if (Array.isArray(parsed) && parsed.length > 0 && !('type' in parsed[0])) {
          localStorage.removeItem('predictions');
          return [];
        }
         // Kombine kuponlar için alanları ekleyen ve bahis durumunu güncelleyen geçiş
        if (Array.isArray(parsed)) {
          parsed = parsed.map(p => {
            if (p.type === PredictionType.Combined) {
              const totalOdds = p.bets.reduce((acc, bet) => acc * (bet.odds || 1), 1);
              const potentialWinnings = totalOdds * 100;
              const migratedBets = p.bets.map(bet => ({
                ...bet,
                status: bet.status || PredictionStatus.Pending,
              }));
              return { ...p, totalOdds, potentialWinnings, bets: migratedBets };
            }
            return p;
          });
        }
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error("Could not parse predictions from localStorage", error);
      localStorage.removeItem('predictions');
      return [];
    }
  });

  const [formView, setFormView] = useState<'live' | 'combined'>('live');
  const [listView, setListView] = useState<'live' | 'combined'>('live');
  const [editingPrediction, setEditingPrediction] = useState<Prediction | null>(null);


  useEffect(() => {
    localStorage.setItem('predictions', JSON.stringify(predictions));
  }, [predictions]);

  const addLivePrediction = (league: string, homeTeam: string, awayTeam: string, prediction: string, minute: string) => {
    const newPrediction: LivePrediction = {
      id: crypto.randomUUID(),
      type: PredictionType.Live,
      league,
      homeTeam,
      awayTeam,
      prediction,
      minute,
      status: PredictionStatus.Pending,
      timestamp: Date.now(),
    };
    setPredictions(prevPredictions => [newPrediction, ...prevPredictions]);
  };

  const addCombinedCoupon = (title: string, bets: Omit<Bet, 'status'>[]) => {
    const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
    const potentialWinnings = totalOdds * 100;
    
    const betsWithStatus: Bet[] = bets.map(bet => ({
      ...bet,
      status: PredictionStatus.Pending,
    }));

    const newCoupon: CombinedCoupon = {
      id: crypto.randomUUID(),
      type: PredictionType.Combined,
      title,
      bets: betsWithStatus,
      status: PredictionStatus.Pending,
      timestamp: Date.now(),
      totalOdds,
      potentialWinnings,
    };
    setPredictions(prevPredictions => [newCoupon, ...prevPredictions]);
  };


  const updatePredictionStatus = (id: string, status: PredictionStatus) => {
    setPredictions(prevPredictions =>
      prevPredictions.map(p => (p.id === id ? { ...p, status } : p))
    );
  };

  const updateBetStatus = (couponId: string, betIndex: number, status: PredictionStatus) => {
    setPredictions(prevPredictions =>
      prevPredictions.map(p => {
        if (p.id === couponId && p.type === PredictionType.Combined) {
          const updatedBets = p.bets.map((bet, index) => 
            index === betIndex ? { ...bet, status } : bet
          );
          return { ...p, bets: updatedBets };
        }
        return p;
      })
    );
  };

  const deletePrediction = (id: string) => {
    setPredictions(prevPredictions => prevPredictions.filter(p => p.id !== id));
  };
  
  const handleEdit = (prediction: Prediction) => {
    setEditingPrediction(prediction);
  };

  const handleCloseModal = () => {
    setEditingPrediction(null);
  };

  const handleUpdatePrediction = (updatedPrediction: Prediction) => {
    setPredictions(prev =>
      prev.map(p => (p.id === updatedPrediction.id ? updatedPrediction : p))
    );
    handleCloseModal();
  };

  const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium transition-colors duration-300 rounded-t-lg
        ${active ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
    >
      {children}
    </button>
  );

  const filteredPredictions = predictions.filter(p => 
    listView === 'live' ? p.type === PredictionType.Live : p.type === PredictionType.Combined
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl mb-8">
          <div className="flex border-b border-gray-700 px-6">
              <TabButton active={formView === 'live'} onClick={() => setFormView('live')}>
                Canlı Tahmin Ekle
              </TabButton>
              <TabButton active={formView === 'combined'} onClick={() => setFormView('combined')}>
                Kombine Kupon Ekle
              </TabButton>
          </div>
          <div className="p-6">
            {formView === 'live' ? (
                <PredictionForm onSubmit={addLivePrediction} />
            ) : (
                <CombinedCouponForm onSubmit={addCombinedCoupon} />
            )}
          </div>
        </div>

        <div>
            <div className="flex border-b border-gray-700 mb-6">
                <TabButton active={listView === 'live'} onClick={() => setListView('live')}>
                    Canlı Maçlar
                </TabButton>
                <TabButton active={listView === 'combined'} onClick={() => setListView('combined')}>
                    Kombine Kuponlar
                </TabButton>
            </div>
            <PredictionList
              predictions={filteredPredictions}
              onUpdateStatus={updatePredictionStatus}
              onDelete={deletePrediction}
              onUpdateBetStatus={updateBetStatus}
              onEdit={handleEdit}
            />
        </div>

      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Canlı Maç Tahminleri. Tüm hakları saklıdır.</p>
      </footer>
      {editingPrediction && (
            <Modal 
                isOpen={!!editingPrediction} 
                onClose={handleCloseModal}
                title={editingPrediction.type === PredictionType.Live ? "Canlı Tahmini Düzenle" : "Kombine Kuponu Düzenle"}
            >
                {editingPrediction.type === PredictionType.Live && (
                    <PredictionForm 
                        initialData={editingPrediction as LivePrediction}
                        onSubmit={(league, homeTeam, awayTeam, prediction, minute) => {
                            handleUpdatePrediction({
                                ...editingPrediction,
                                league,
                                homeTeam,
                                awayTeam,
                                prediction,
                                minute
                            });
                        }}
                        onCancel={handleCloseModal}
                    />
                )}
                {editingPrediction.type === PredictionType.Combined && (
                    <CombinedCouponForm
                        initialData={editingPrediction as CombinedCoupon}
                        onSubmit={(title, bets) => {
                            const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
                            const potentialWinnings = totalOdds * 100;
                            
                            const betsWithStatus: Bet[] = bets.map(newBet => {
                                const existingBet = (editingPrediction as CombinedCoupon).bets.find(
                                    oldBet => oldBet.homeTeam === newBet.homeTeam && 
                                              oldBet.awayTeam === newBet.awayTeam &&
                                              oldBet.prediction === newBet.prediction
                                );
                                return {
                                    ...newBet,
                                    status: existingBet?.status || PredictionStatus.Pending,
                                };
                            });

                            handleUpdatePrediction({
                                ...editingPrediction,
                                title,
                                bets: betsWithStatus,
                                totalOdds,
                                potentialWinnings,
                            });
                        }}
                        onCancel={handleCloseModal}
                    />
                )}
            </Modal>
        )}
    </div>
  );
};

export default App;