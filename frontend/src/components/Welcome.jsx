import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
            {/* Main Content Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-2xl">
                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                            Welcome to FinTrack
                        </h1>
                        <p className="text-lg text-blue-100 leading-relaxed mb-4">
                            Your personal finance companion for smarter money management
                        </p>
                        <p className="text-base text-slate-300 leading-relaxed">
                            Track income and expenses, visualize spending patterns, and gain insights into where your money goes with our intuitive finance dashboard.
                        </p>
                    </div>

                    {/* Features Section */}
                    <div className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10">
                        <h2 className="text-2xl font-bold text-white mb-8">Here's how it works:</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-base text-slate-200 leading-relaxed">
                                    <span className="font-semibold text-white">Add Transactions</span> — Quickly log income and expense entries with category, amount, and date.
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-base text-slate-200 leading-relaxed">
                                    <span className="font-semibold text-white">Manage Your List</span> — View all transactions in a searchable list, edit or remove items as needed.
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-base text-slate-200 leading-relaxed">
                                    <span className="font-semibold text-white">Visualize Spending</span> — See a detailed breakdown of expenses by category with interactive charts.
                                </span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span className="text-base text-slate-200 leading-relaxed">
                                    <span className="font-semibold text-white">Secure Access</span> — Sign up or log in to keep your financial data safe and accessible anytime.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <Link
                            to="/fintrack"
                            className="px-12 py-4 min-w-[220px] h-14 flex items-center justify-center text-white font-bold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:from-purple-700 active:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Go to FinTrack
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
