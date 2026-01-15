import { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Layout({ children }) {
    const { user, logout } = useFinance();
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleKeyDown(e) {
        if (e.key === 'Escape') setShowDropdown(false);
        if (e.key === 'Enter') setShowDropdown((v) => !v);
    }

    return (
        <div className="container flex flex-col min-h-screen">
            <header className="flex justify-between items-center mb-8 pt-4 relative">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="FinTrack Logo" className="logo-sm" />
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                        FinTrack
                    </h1>
                </div>
                        {user ? (
                    <div className="relative" ref={containerRef}>
                        <button
                            aria-haspopup="true"
                            aria-expanded={showDropdown}
                            onKeyDown={handleKeyDown}
                            onClick={() => setShowDropdown((s) => !s)}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-color/30 whitespace-nowrap"
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs text-secondary opacity-70">Welcome,</span>
                                <span className="text-sm font-semibold text-text-primary truncate">{user.username}</span>
                            </div>
                            <div className="ml-3 w-9 h-9 rounded-full bg-gradient-to-br from-primary-color to-accent-color flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <svg
                                className={`w-4 h-4 text-secondary ml-1 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-3 w-72 bg-card/95 backdrop-blur-xl border border-white/12 rounded-xl shadow-2xl z-50 overflow-hidden user-dropdown" role="menu">
                                <div className="p-4 bg-gradient-to-r from-primary-color/10 to-accent-color/10 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-color to-accent-color flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">{user.username}</p>
                                            {user.email && <p className="text-xs text-secondary/80 truncate">{user.email}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 px-2">
                                    <button
                                        role="menuitem"
                                        className="dropdown-item"
                                        onClick={() => alert('Profile feature coming soon!')}
                                    >
                                        <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Profile Information</span>
                                        <svg className="dropdown-chev" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button role="menuitem" className="dropdown-item mt-1" onClick={logout}>
                                        <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Logout</span>
                                        <svg className="dropdown-chev" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-secondary opacity-80">Welcome</div>
                )}
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="py-6 text-center text-secondary text-sm mt-8 border-t border-white/10">
                Made with ❤️ by <a href="https://github.com/sidharthprem310" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Sidharth Prem</a>
            </footer>
        </div>
    );
}
