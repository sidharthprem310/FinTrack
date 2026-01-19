import { useState, useEffect } from 'react';
import { useFinance } from '../context/useFinance';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const { signup, user } = useFinance();
    const navigate = useNavigate();

    // Only redirect if user is logged in AND we are NOT showing the verify modal
    // (Meaning they logged in normally, not just signed up waiting for verify)
    useEffect(() => {
        if (user && !showVerifyModal && !isSigningUp) {
            navigate('/fintrack');
        }
    }, [user, isSigningUp, showVerifyModal, navigate]);

    const validateForm = () => {
        if (!username.trim()) {
            setError('Username is required');
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$.%&*;]).{8,14}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be 8-14 characters with uppercase, lowercase, number, and symbol (!@#$.%&*;).');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setIsSigningUp(true);
            const { error } = await signup(username, email, password);
            if (error) throw error;

            // If successful (and Supabase requires verification), show modal
            setIsSigningUp(false);
            setShowVerifyModal(true);

        } catch (err) {
            setIsSigningUp(false);
            console.error("Signup error:", err);
            if (err.message && (err.message.includes("already registered") || err.code === 'user_already_exists')) {
                setError('This email is already registered. Please sign in instead.');
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] relative">
            {/* Verification Modal */}
            {showVerifyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all scale-100">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100/10 mb-6">
                            <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Verify your email</h3>
                        <p className="text-slate-300 mb-8">
                            We've sent a verification link to <span className="text-primary-color font-semibold">{email}</span>. Please check your inbox to activate your account.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-900/20"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

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
                        disabled={isSigningUp || showVerifyModal}
                        style={{
                            background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
                            cursor: isSigningUp ? 'not-allowed' : 'pointer',
                            width: '100%',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            transition: 'all 300ms',
                            opacity: isSigningUp ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => {
                            if (!isSigningUp) {
                                e.target.style.opacity = '0.9';
                                e.target.style.boxShadow = '0 20px 35px -5px rgba(147, 51, 234, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSigningUp) {
                                e.target.style.opacity = '1';
                                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
                            }
                        }}
                    >
                        {isSigningUp ? 'Creating Account...' : 'Create Account'}
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
