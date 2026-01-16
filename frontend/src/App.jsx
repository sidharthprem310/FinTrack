import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { useFinance } from './context/useFinance';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import Welcome from './components/Welcome';
import Login from './components/Login';

// Separate component to handle protected routes and accessing context
const AppRoutes = () => {
  const { user, loading } = useFinance();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-primary-color">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/welcome"
        element={
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
            <div className="container flex flex-col min-h-screen pt-4">
              <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="FinTrack Logo" className="logo-sm" />
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
                    FinTrack
                  </h1>
                </div>
                <div className="text-slate-300">
                  <span>Ready to start?</span>
                </div>
              </header>
              <main className="flex-grow flex items-center justify-center">
                <Welcome />
              </main>
              <footer className="py-6 text-center text-slate-400 text-sm mt-8 border-t border-white/10">
                Made with <span className="text-pink-500">❤️</span> by <a href="https://github.com/sidharthprem310" target="_blank" rel="noopener noreferrer" className="font-bold text-pink-500 hover:text-pink-400 transition-colors duration-200 underline underline-offset-2">Sidharth Prem</a>
              </footer>
            </div>
          </div>
        }
      />
      <Route
        path="/fintrack"
        element={
          user ? (
            <Layout>
              <>
                <Dashboard />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <TransactionForm />
                    <TransactionList />
                  </div>
                  <div>
                    <ExpenseChart />
                  </div>
                </div>
              </>
            </Layout>
          ) : (
            <Layout>
              <Login />
            </Layout>
          )
        }
      />
      <Route path="/" element={<Navigate to="/welcome" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <FinanceProvider>
        <AppRoutes />
      </FinanceProvider>
    </Router>
  );
}

export default App;
