import { useState } from 'react';
import { useFinance } from '../context/useFinance';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useFinance();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password);
            navigate('/fintrack');
        } catch (err) {
            if (err.response && err.response.data) {
                // Handling Django errors (e.g. {username: ["A user with that username already exists."]})
                const errorData = err.response.data;
                // Get the first error message from the object
                const firstKey = Object.keys(errorData)[0];
                const message = Array.isArray(errorData[firstKey]) ? errorData[firstKey][0] : errorData[firstKey];
                setError(`${firstKey === 'non_field_errors' ? '' : firstKey + ': '}${message}`);
            } else {
                setError('Registration failed. Username may be taken.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-card w-full max-w-sm p-8 rounded-2xl shadow-lg border border-white/5">
                <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    Welcome to FinTrack!
                </h2>
                <p className="text-center text-secondary mb-8">
                    Let's get your finances ordered.
                </p>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-center text-sm border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-secondary mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-secondary mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-secondary mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Choose a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-4 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:from-purple-700 active:to-pink-700 shadow-lg hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Create Account
                    </button>

                    <div className="text-center text-sm text-secondary mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary link-bold ml-1">
                            Learn more / Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
