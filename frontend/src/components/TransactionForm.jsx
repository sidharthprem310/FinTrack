import { useState } from 'react';
import { useFinance } from '../context/useFinance';

export default function TransactionForm() {
    const { addTransaction } = useFinance();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: 'General',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction(formData);
        setFormData({ ...formData, title: '', amount: '' });
    };

    return (
        <div className="card mb-4">
            <h2 className="text-secondary mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Groceries, Salary, etc."
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        step="0.01"
                        placeholder="₹0.00"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Type</label>
                    <select
                        className="form-control"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                        className="form-control"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="General">General</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="input-group">
                    <label className="input-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group flex items-end">
                    <button type="submit" className="btn w-full">
                        Add Transaction
                    </button>
                </div>
            </form>
        </div>
    );
}
