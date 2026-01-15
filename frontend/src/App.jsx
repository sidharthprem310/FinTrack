import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import Login from './components/Login';
import Signup from './components/Signup';

// Separate component to handle protected routes and accessing context
const AppRoutes = () => {
  const { user, loading } = useFinance();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-primary-color">Loading...</div>;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={
            user ? (
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
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Layout>
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
