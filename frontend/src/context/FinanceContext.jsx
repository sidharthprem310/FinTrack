import { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            fetchTransactions();
        } else {
            setTransactions([]);
        }
    }, [user]);

    const fetchTransactions = async () => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setTransactions(data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError(err.message);
        }
    };

    const addTransaction = async (transaction) => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .insert([{
                    ...transaction,
                    user_id: user.id
                }])
                .select();

            if (error) throw error;
            setTransactions([data[0], ...transactions]);
        } catch (err) {
            console.error('Error adding transaction:', err);
            setError('Failed to add transaction');
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
            setError('Failed to delete transaction');
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data.user;
    };

    const signup = async (username, email, password) => {
        // Supabase Auth uses email/password. Username is less standard but can be metadata.
        // For simplicity, we'll just use email/password here.
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username }, // Store username in metadata
            },
        });
        if (error) throw error;
        return data.user;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setTransactions([]);
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

    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/change-password`,
        });
        if (error) throw error;
    };

    const updatePassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
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
                resetPassword,
                updatePassword,
                addTransaction,
                deleteTransaction,
                summary: getSummary(),
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}
