import { useState, useEffect } from 'react';
import { useFinance } from '../context/useFinance';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login, user } = useFinance();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && isLoggingIn) {
            setIsLoggingIn(false);
            navigate('/fintrack');
        }
    }, [user, isLoggingIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoggingIn(true);
            await login(username, password);
        } catch (err) {
            setIsLoggingIn(false);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const errorMessage = errorData.error || errorData.detail || Object.values(errorData)[0] || 'Login failed';
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
                        style={{
                            background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
                            cursor: 'pointer',
                            width: '100%',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            transition: 'all 300ms'
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
                        Sign In
                    </button>

                    <div className="text-center text-sm text-secondary mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-accent link-bold ml-1">
                            Get started
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
