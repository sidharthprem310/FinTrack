import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions/');
            setTransactions(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch transactions');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (transaction) => {
        try {
            const response = await axios.post('/api/transactions/', transaction);
            setTransactions([response.data, ...transactions]);
        } catch (err) {
            setError('Failed to add transaction');
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}/`);
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (err) {
            setError('Failed to delete transaction');
        }
    };

    const getSummary = () => {
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);
        const expense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);
        const balance = income - expense;
        return { income, expense, balance };
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                loading,
                error,
                addTransaction,
                deleteTransaction,
                summary: getSummary(),
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};
