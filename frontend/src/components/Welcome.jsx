import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    return (

        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 1.5rem', maxWidth: '1150px', margin: '0 auto' }}>
            {/* Main Heading */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem', lineHeight: '1.2' }}>
                    Welcome to FinTrack
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#dbeafe', maxWidth: '42rem', margin: '0 auto 1rem', fontWeight: '300' }}>
                    Your personal finance companion for smarter money management
                </p>
                <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '48rem', margin: '0 auto', lineHeight: '1.6' }}>
                    Track income and expenses, visualize spending patterns, and gain insights into where your money goes with our intuitive finance dashboard.
                </p>
            </div>

            {/* Features Section - Explicit Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem'
            }}>
                {/* Card 1 */}
                <div style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600" alt="Add Transactions" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Add Transactions</h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                            Quickly log income and expense entries with category, amount, and date.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600" alt="Manage List" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Manage Your List</h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                            View all transactions in a searchable list. Edit or remove items easily.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=600" alt="Visualize Spending" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Visualize Spending</h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                            See a detailed breakdown of expenses by category with interactive charts.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Button - Explicit Styles */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNavigate}
                    type="button"
                    style={{
                        background: 'linear-gradient(to right, #9333ea, #db2777)',
                        color: 'white',
                        padding: '0.8rem 2.5rem',
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(147, 51, 234, 0.3)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(147, 51, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(147, 51, 234, 0.3)';
                    }}
                >
                    Go to FinTrack
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
