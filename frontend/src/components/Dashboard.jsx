import React from 'react';
import './Dashboard.css';
import TotalExpenseCard from './TotalExpenseCard';
import CategoryCountCard from './CategoryCountCard';
import HighestCategoryCard from './HighestCategoryCard';
import CategoryDistributionCard from './CategoryDistributionCard';
import ExpenseTrendCard from './ExpenseTrendCard';
import RecentExpensesCard from './RecentExpensesCard';

const Dashboard = ({ expenses, onAddExpense, onExportCSV, onViewReport, onViewAllExpenses }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-row dashboard-cards-row">
        <TotalExpenseCard expenses={expenses} />
        <CategoryCountCard expenses={expenses} />
        <HighestCategoryCard expenses={expenses} />
      </div>
      <div className="dashboard-row dashboard-charts-row">
        <CategoryDistributionCard expenses={expenses} />
        <ExpenseTrendCard expenses={expenses} />
      </div>
      <div className="dashboard-row dashboard-recent-row">
        <RecentExpensesCard expenses={expenses} onViewAllExpenses={onViewAllExpenses} />
      </div>
      <div className="dashboard-row dashboard-actions-row">
        <button className="dashboard-action-btn" onClick={onAddExpense}>Add Expense</button>
        <button className="dashboard-action-btn" onClick={onExportCSV}>Export CSV</button>
        <button className="dashboard-action-btn" onClick={onViewReport}>View Report</button>
      </div>
    </div>
  );
};

export default Dashboard;
