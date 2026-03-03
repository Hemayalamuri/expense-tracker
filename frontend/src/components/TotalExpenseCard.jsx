import React from 'react';
const TotalExpenseCard = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  return (
    <div className="dashboard-card total-expense-card">
      <div className="dashboard-card-title">Total Spent</div>
      <div className="dashboard-card-value">${total.toFixed(2)}</div>
    </div>
  );
};
export default TotalExpenseCard;
