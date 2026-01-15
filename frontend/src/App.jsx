import { FinanceProvider } from './context/FinanceContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

function App() {
  return (
    <FinanceProvider>
      <Layout>
        <Dashboard />
        <div className="grid grid-cols-3 gap-4">
          <div style={{ gridColumn: 'span 2' }}>
            <TransactionForm />
            <TransactionList />
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>
      </Layout>
    </FinanceProvider>
  );
}

export default App;
