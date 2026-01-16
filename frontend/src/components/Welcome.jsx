import { Link } from 'react-router-dom';

export default function Welcome() {
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
                <Link
                    to="/fintrack"
                    className="inline-flex items-center justify-center px-14 py-4 min-w-[240px] h-16 text-white font-bold text-xl rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:from-purple-700 active:to-pink-700 shadow-2xl hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-110 active:scale-95 uppercase tracking-wide"
                >
                    Go to FinTrack
                </Link>
            </div>
        </div>
    );
}
