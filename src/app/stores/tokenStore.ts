import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'purchased';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface TokenState {
  balance: number;
  transactions: Transaction[];
  earnedTotal: number;
  spentTotal: number;
  purchasedTotal: number;
  
  addTokens: (amount: number, description: string, type: 'earned' | 'purchased') => void;
  spendTokens: (amount: number, description: string) => boolean;
  claimReward: (reward: { amount: number; description: string }) => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      earnedTotal: 0,
      spentTotal: 0,
      purchasedTotal: 0,

      addTokens: (amount: number, description: string, type: 'earned' | 'purchased') => {
        const transaction: Transaction = {
          id: Math.random().toString(36).substring(7),
          type,
          amount,
          description,
          date: new Date().toISOString(),
          status: 'completed',
        };

        set(state => ({
          balance: state.balance + amount,
          transactions: [transaction, ...state.transactions],
          earnedTotal: type === 'earned' ? state.earnedTotal + amount : state.earnedTotal,
          purchasedTotal: type === 'purchased' ? state.purchasedTotal + amount : state.purchasedTotal,
        }));
      },

      spendTokens: (amount: number, description: string) => {
        const currentBalance = get().balance;
        
        if (currentBalance < amount) {
          return false;
        }

        const transaction: Transaction = {
          id: Math.random().toString(36).substring(7),
          type: 'spent',
          amount,
          description,
          date: new Date().toISOString(),
          status: 'completed',
        };

        set(state => ({
          balance: state.balance - amount,
          transactions: [transaction, ...state.transactions],
          spentTotal: state.spentTotal + amount,
        }));

        return true;
      },

      claimReward: (reward: { amount: number; description: string }) => {
        get().addTokens(reward.amount, reward.description, 'earned');
      },
    }),
    {
      name: 'ekilore-tokens',
    }
  )
);
