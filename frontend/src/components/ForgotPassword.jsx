import { useState } from 'react';
import { useFinance } from '../context/useFinance';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useFinance();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await resetPassword(email);
            setMessage('Check with your registered email address');
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-card w-full max-w-sm p-8 rounded-2xl shadow-lg border border-white/5">
                <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    Reset Password
                </h2>
                <p className="text-center text-secondary mb-8">
                    Enter your email to receive a password reset link.
                </p>

                {message && (
                    <div className="bg-green-500/10 text-green-500 p-3 rounded-lg mb-4 text-center text-sm border border-green-500/20">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-center text-sm border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            width: '100%',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            transition: 'all 300ms',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className="text-center text-sm text-secondary mt-4">
                        Remembered your password?{' '}
                        <Link to="/login" className="text-primary link-bold ml-1">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
