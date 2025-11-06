export enum PredictionStatus {
  Pending = 'Beklemede',
  Won = 'Kazandı',
  Lost = 'Kaybetti',
}

export enum PredictionType {
  Live = 'Canlı',
  Combined = 'Kombine',
}

// Kombine kupon içindeki tek bir bahis için arayüz
export interface Bet {
  league: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odds: number;
  status: PredictionStatus; // Her bahisin kendi durumu
}

// Tüm tahminler için temel özellikler
interface BasePrediction {
  id: string;
  status: PredictionStatus;
  timestamp: number;
}

// Canlı maç tahmini için veri yapısı
export interface LivePrediction extends BasePrediction {
  type: PredictionType.Live;
  league: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  minute: string;
}

// Kombine kupon için veri yapısı
export interface CombinedCoupon extends BasePrediction {
  type: PredictionType.Combined;
  title: string;
  bets: Bet[];
  totalOdds: number;
  potentialWinnings: number;
}

// Her iki tahmin türünü de kapsayan birleşik tür
export type Prediction = LivePrediction | CombinedCoupon;