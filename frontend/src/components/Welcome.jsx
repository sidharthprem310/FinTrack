import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="bg-card w-full max-w-3xl p-12 rounded-2xl shadow-lg border border-white/5">
                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                        Welcome to FinTrack
                    </h2>
                    <p className="text-center text-base text-secondary leading-relaxed">
                        FinTrack helps you track income, expenses, and visualize where your money goes.
                        Add transactions, view a running list, and see a breakdown of spending by category.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mb-12 px-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Here's how it works:</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-accent text-lg mt-0.5">•</span>
                            <span className="text-secondary leading-relaxed">Add income and expense entries via the transaction form.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent text-lg mt-0.5">•</span>
                            <span className="text-secondary leading-relaxed">See all transactions in a searchable list and remove or edit items.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent text-lg mt-0.5">•</span>
                            <span className="text-secondary leading-relaxed">View an expense chart to quickly understand spending patterns.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent text-lg mt-0.5">•</span>
                            <span className="text-secondary leading-relaxed">Your data is tied to your account — sign up or log in from the app if prompted.</span>
                        </li>
                    </ul>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center pt-4">
                    <Link to="/fintrack" className="px-8 py-3 bg-gradient-to-r from-primary-color to-accent-color text-white font-semibold text-lg rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                        Go to FinTrack
                    </Link>
                </div>
            </div>
        </div>
    );
}
