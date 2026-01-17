import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            {/* Main Heading */}
            <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-8 text-white">
                    Welcome to FinTrack
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-4 font-light">
                    Your personal finance companion for smarter money management
                </p>
                <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Track income and expenses, visualize spending patterns, and gain insights into where your money goes with our intuitive finance dashboard.
                </p>
            </div>

            {/* Features Section */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-12 mb-16">
                <h2 className="text-2xl font-bold text-white mb-10">Here's how it works:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex gap-4">
                        <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 leading-none">•</div>
                        <div>
                            <h3 className="font-semibold text-white mb-2 text-lg">Add Transactions</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Quickly log income and expense entries with category, amount, and date.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 leading-none">•</div>
                        <div>
                            <h3 className="font-semibold text-white mb-2 text-lg">Manage Your List</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">View all transactions in a searchable list, edit or remove items as needed.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 leading-none">•</div>
                        <div>
                            <h3 className="font-semibold text-white mb-2 text-lg">Visualize Spending</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">See a detailed breakdown of expenses by category with interactive charts.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pb-8">
                <button
                    onClick={handleNavigate}
                    type="button"
                    style={{
                        background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
                        cursor: 'pointer',
                        padding: '1rem 3.5rem',
                        minWidth: '240px',
                        height: '64px',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                        transition: 'all 300ms',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.opacity = '0.9';
                        e.target.style.boxShadow = '0 20px 35px -5px rgba(147, 51, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
                    }}
                >
                    Go to FinTrack
                </button>
            </div>
        </div>
    );
}
