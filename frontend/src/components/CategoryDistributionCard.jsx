import React from 'react';
import CategoryPieChart from './CategoryPieChart';
const CategoryDistributionCard = ({ expenses }) => (
  <div className="dashboard-card category-distribution-card">
    <div className="dashboard-card-title">Category Distribution</div>
    <CategoryPieChart expenses={expenses} />
  </div>
);
export default CategoryDistributionCard;
