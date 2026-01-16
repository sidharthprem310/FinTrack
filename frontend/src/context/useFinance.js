import { useContext } from 'react';
import { FinanceContext } from './FinanceContext';

export const useFinance = () => useContext(FinanceContext);
