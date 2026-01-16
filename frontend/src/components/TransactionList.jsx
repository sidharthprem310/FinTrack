import { useState } from 'react';
import { useFinance } from '../context/useFinance';
import { downloadCSV } from '../utils/csvHelper';

export default function TransactionList() {
    const { transactions, deleteTransaction } = useFinance();
    const [filter, setFilter] = useState('all'); // all, day, month, year

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    const getFilteredTransactions = () => {
        const now = new Date();
        return transactions.filter((t) => {
            const tDate = new Date(t.date);
            if (filter === 'day') {
                return tDate.toDateString() === now.toDateString();
            } else if (filter === 'month') {
                return (
                    tDate.getMonth() === now.getMonth() &&
                    tDate.getFullYear() === now.getFullYear()
                );
            } else if (filter === 'year') {
                return tDate.getFullYear() === now.getFullYear();
            }
            return true;
        });
    };

    const filteredTransactions = getFilteredTransactions();

    const handleExport = () => {
        // Prepare data for export - exclude id and created_at from export
        const dataToExport = filteredTransactions.map(({ id, created_at, ...rest }) => rest);
        downloadCSV(dataToExport, `transactions_${filter}_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-secondary m-0" style={{ marginBottom: 0 }}>Transactions</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="btn"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: '#10b981' }}
                    >
                        Export CSV
                    </button>
                    <select
                        className="form-control"
                        style={{ width: 'auto', padding: '0.5rem' }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Time</option>
                        <option value="day">Today</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {filteredTransactions.map((t) => (
                    <div
                        key={t.id}
                        className="flex justify-between items-center p-3 rounded"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                        <div>
                            <div className="font-bold">{t.title}</div>
                            <div className="text-sm text-secondary">
                                {formatDate(t.date)} • {t.category}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span
                                className={
                                    t.type === 'income' ? 'amount-income' : 'amount-expense'
                                }
                            >
                                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                            </span>
                            <button
                                onClick={() => deleteTransaction(t.id)}
                                className="text-danger opacity-50 hover:opacity-100"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
                {filteredTransactions.length === 0 && (
                    <div className="text-center text-secondary py-4">
                        No transactions found for this period.
                    </div>
                )}
            </div>

            {filter === 'month' && filteredTransactions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <h3 className="text-sm text-secondary mb-2 uppercase tracking-wider">Monthly Category Breakdown</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(
                            filteredTransactions.reduce((acc, t) => {
                                acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
                                return acc;
                            }, {})
                        ).map(([cat, total]) => (
                            <div key={cat} className="flex justify-between text-sm p-2 rounded bg-black/20">
                                <span>{cat}</span>
                                <span className="font-mono">{formatCurrency(total)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
