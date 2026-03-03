import React from 'react';
const HighestCategoryCard = ({ expenses }) => {
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
  });
  const highest = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  return (
    <div className="dashboard-card highest-category-card">
      <div className="dashboard-card-title">Highest Category</div>
      <div className="dashboard-card-value">{highest ? `${highest[0]} ($${highest[1].toFixed(2)})` : '-'}</div>
    </div>
  );
};
export default HighestCategoryCard;
