import React, { useState } from 'react';

const CustomerList = ({ customers, onCustomerDeleted, loading }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onCustomerDeleted();
      } else {
        alert('Failed to delete customer. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="customer-list-container">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <span className="title-icon">📋</span>
            Customer Directory
          </h2>
          <p className="section-subtitle">
            {customers.length} {customers.length === 1 ? 'customer' : 'customers'} in database
          </p>
        </div>

        {customers.length > 0 && (
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading customers...</p>
        </div>
      ) : customers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No Customers Yet</h3>
          <p>Add your first customer using the form above</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No Results Found</h3>
          <p>Try searching with different keywords</p>
        </div>
      ) : (
        <div className="customer-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer._id} className="table-row" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>
                    <div className="customer-name">
                      <div className="avatar">{customer.name.charAt(0).toUpperCase()}</div>
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${customer.email}`} className="email-link">
                      {customer.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${customer.phone}`} className="phone-link">
                      {customer.phone}
                    </a>
                  </td>
                  <td>
                    <span className="company-badge">{customer.company}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="btn-delete"
                      disabled={deletingId === customer._id}
                    >
                      {deletingId === customer._id ? (
                        <>
                          <span className="spinner-small"></span>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <span className="btn-icon">🗑️</span>
                          Delete
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;