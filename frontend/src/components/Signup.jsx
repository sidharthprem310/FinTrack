import { useState, useEffect } from 'react';
import { useFinance } from '../context/useFinance';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const { signup, user } = useFinance();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && isSigningUp) {
            setIsSigningUp(false);
            navigate('/fintrack');
        }
    }, [user, isSigningUp, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSigningUp(true);
            await signup(username, email, password);
        } catch (err) {
            setIsSigningUp(false);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const firstKey = Object.keys(errorData)[0];
                let message = errorData[firstKey];
                
                // Handle array of error messages
                if (Array.isArray(message)) {
                    message = message[0];
                }
                
                // Handle nested objects or convert to string
                if (typeof message === 'object' && message !== null) {
                    message = JSON.stringify(message);
                }
                
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
                        Create Account
                    </button>

                    <div className="text-center text-sm text-secondary mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary link-bold ml-1">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
