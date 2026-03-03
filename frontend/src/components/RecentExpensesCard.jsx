import React, { useState } from 'react';
const RecentExpensesCard = ({ expenses }) => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? [...expenses].sort((a,b)=>b.date.localeCompare(a.date)) : [...expenses].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  return (
    <div className="dashboard-card recent-expenses-card" style={{ width: '100%', maxWidth: '100%' }}>
      <div className="dashboard-card-title recent-title-row">
        <span>{showAll ? 'All Expenses' : 'Recent Expenses'}</span>
        <button className="view-all-btn small-btn" onClick={() => setShowAll(v => !v)}>
          {showAll ? 'View Less' : 'View All Expenses'}
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="recent-expenses-table center-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((e, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{e.date}</td>
                <td style={{ textAlign: 'center' }}>{e.category}</td>
                <td style={{ textAlign: 'center' }}>${Number(e.amount).toFixed(2)}</td>
                <td style={{ textAlign: 'center' }}>{e.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentExpensesCard;
