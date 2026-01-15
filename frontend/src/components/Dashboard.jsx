import { useFinance } from '../context/FinanceContext';
import { financeTips } from '../data/tips';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { summary } = useFinance();

    const [tip, setTip] = useState(financeTips[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomTip = financeTips[Math.floor(Math.random() * financeTips.length)];
            setTip(randomTip);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="card">
                    <div className="input-label">Total Balance</div>
                    <h2>{formatCurrency(summary.balance)}</h2>
                </div>
                <div className="card">
                    <div className="input-label">Income</div>
                    <h2 className="amount-income">{formatCurrency(summary.income)}</h2>
                </div>
                <div className="card">
                    <div className="input-label">Expenses</div>
                    <h2 className="amount-expense">{formatCurrency(summary.expense)}</h2>
                </div>
            </div>
            <div className="card mb-4" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)' }}>
                <div className="flex items-start gap-4">
                    <div style={{ fontSize: '1.5rem' }}>💡</div>
                    <div>
                        <div className="font-bold text-primary mb-1">Saving Tip</div>
                        <div className="text-sm text-secondary">{tip}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
