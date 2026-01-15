import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ExpenseChart() {
    const { transactions } = useFinance();

    const data = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => {
            const existing = acc.find((item) => item.name === t.category);
            if (existing) {
                existing.value += parseFloat(t.amount);
            } else {
                acc.push({ name: t.category, value: parseFloat(t.amount) });
            }
            return acc;
        }, []);

    if (data.length === 0) return null;

    return (
        <div className="card mb-4" style={{ height: '300px' }}>
            <h2 className="text-secondary mb-4">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
