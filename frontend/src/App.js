import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import './styles/app.css';

const API_BASE_URL = "https://future-fs-02-vqv0.onrender.com";

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="app">
      <Dashboard customers={customers} loading={loading} />
      <CustomerForm onCustomerAdded={fetchCustomers} />
      <CustomerList
        customers={customers}
        onCustomerDeleted={fetchCustomers}
        loading={loading}
      />

      <footer className="app-footer">
        Mini CRM Dashboard • Built for Internship Evaluation
      </footer>
    </div>
  );
}

export default App;
