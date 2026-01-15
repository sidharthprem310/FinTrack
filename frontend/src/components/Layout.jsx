export default function Layout({ children }) {
    return (
        <div className="container flex flex-col min-h-screen">
            <header className="flex justify-between items-center mb-8 pt-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    FinTrack
                </h1>
                <div className="text-secondary opacity-80">Welcome Back</div>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="py-6 text-center text-secondary text-sm mt-8 border-t border-white/10">
                Made with ❤️ by <a href="https://github.com/sidharthprem310" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Sidharth Prem</a>
            </footer>
        </div>
    );
}
