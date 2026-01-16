import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-card w-full max-w-2xl p-10 rounded-2xl shadow-lg border border-white/5">
                <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    Welcome to FinTrack
                </h2>
                <p className="text-center text-secondary mb-6">
                    FinTrack helps you track income, expenses, and visualize where your money goes.
                    Add transactions, view a running list, and see a breakdown of spending by category.
                </p>

                <div className="prose mx-auto text-sm text-secondary mb-6">
                    <ul className="list-disc pl-5">
                        <li>Add income and expense entries via the transaction form.</li>
                        <li>See all transactions in a searchable list and remove or edit items.</li>
                        <li>View an expense chart to quickly understand spending patterns.</li>
                        <li>Your data is tied to your account — sign up or log in from the app if prompted.</li>
                    </ul>
                </div>

                <div className="flex justify-center">
                    <Link to="/fintrack" className="btn-submit">
                        Go to FinTrack
                    </Link>
                </div>
            </div>
        </div>
    );
}
