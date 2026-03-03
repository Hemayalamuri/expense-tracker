import React from 'react';
const CategoryCountCard = ({ expenses }) => {
  const categories = new Set(expenses.map(e => e.category));
  return (
    <div className="dashboard-card category-count-card">
      <div className="dashboard-card-title">Categories Used</div>
      <div className="dashboard-card-value">{categories.size}</div>
    </div>
  );
};
export default CategoryCountCard;
