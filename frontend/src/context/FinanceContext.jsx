import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions/');
            setTransactions(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            // Don't show error if just authorized, or maybe handle differently
            // setError('Failed to fetch transactions'); 
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTransactions();
        } else {
            setLoading(false);
        }
    }, [user]);

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

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/login/', { username, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (err) {
            throw err;
        }
    };

    const signup = async (username, email, password) => {
        try {
            await axios.post('/api/register/', { username, email, password });
            return await login(username, password);
        } catch (err) {
            throw err;
        }
    }

    const logout = () => {
        setUser(null);
        setTransactions([]);
        localStorage.removeItem('user');
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
                user,
                login,
                signup,
                logout,
                addTransaction,
                deleteTransaction,
                summary: getSummary(),
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};
