import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Layout({ children }) {
    const { user, logout } = useFinance();
    const [showDropdown, setShowDropdown] = useState(false);

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
                    <div className="relative">
                        <div className="flex items-center gap-2 text-secondary opacity-80">
                            Welcome Back,
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="font-bold hover:text-primary-color transition-colors focus:outline-none cursor-pointer"
                            >
                                {user.username}
                            </button>
                        </div>

                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden user-dropdown">
                                <div className="p-4 border-b border-white/10">
                                    <p className="text-sm font-bold text-text-primary">{user.username}</p>
                                    {user.email && <p className="text-xs text-secondary truncate">{user.email}</p>}
                                </div>
                                <button
                                    className="w-full text-left px-4 py-3 text-sm text-text-primary hover:bg-white/5 transition-colors"
                                    onClick={() => alert("Profile feature coming soon!")}
                                >
                                    Profile Information
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                                >
                                    Logout
                                </button>
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
