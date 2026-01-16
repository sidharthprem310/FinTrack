import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);



    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    const response = await axios.get('/api/transactions/');
                    setTransactions(response.data);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            })();
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
        } catch (error) {
            setError('Failed to delete transaction');
        }
    };

    const login = async (username, password) => {
        const response = await axios.post('/api/login/', { username, password });
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const signup = async (username, email, password) => {
        await axios.post('/api/register/', { username, email, password });
        return await login(username, password);
    };

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
}
