import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useFinance();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data) {
                // Handle Django DRF error format
                const errorData = err.response.data;
                const errorMessage = errorData.error || errorData.detail || Object.values(errorData)[0] || 'Login failed';
                // If it's an array (like ['This field is required']), join it
                setError(Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage);
            } else {
                setError('Invalid username or password');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-card w-full max-w-sm p-8 rounded-2xl shadow-lg border border-white/5">
                <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    Welcome Back!
                </h2>
                <p className="text-center text-secondary mb-8">
                    We've missed you. Please sign in to continue.
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
                            placeholder="Enter your username"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                    >
                        Sign In
                    </button>

                    <div className="text-center text-sm text-secondary mt-4">
                        Don't have an account?{' '}
                        <Link to="/welcome" className="text-accent link-bold ml-1">
                            Learn more / Get started
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
