import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const groupBy = (arr, keyFn) => {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + Number(item.amount);
    return acc;
  }, {});
};

const ExpenseTrendCard = ({ expenses }) => {
  const [tab, setTab] = useState('daily');
  let grouped = {};
  if (tab === 'daily') {
    grouped = groupBy(expenses, e => e.date);
  } else if (tab === 'monthly') {
    grouped = groupBy(expenses, e => e.date.slice(0,7));
  } else if (tab === 'yearly') {
    grouped = groupBy(expenses, e => e.date.slice(0,4));
  }
  const labels = Object.keys(grouped).sort();
  const data = {
    labels,
    datasets: [{
      label: 'Expenses',
      data: labels.map(l => grouped[l]),
      backgroundColor: '#4f8cff',
    }]
  };
  return (
    <div className="dashboard-card expense-trend-card">
      <div className="dashboard-card-title">Expense Trend</div>
      <div className="trend-tabs">
        <button className={tab==='daily' ? 'active' : ''} onClick={()=>setTab('daily')}>Daily</button>
        <button className={tab==='monthly' ? 'active' : ''} onClick={()=>setTab('monthly')}>Monthly</button>
        <button className={tab==='yearly' ? 'active' : ''} onClick={()=>setTab('yearly')}>Yearly</button>
      </div>
      <div className="trend-chart">
        <Bar data={data} options={{responsive:true, plugins:{legend:{display:false}}}} />
      </div>
    </div>
  );
};
export default ExpenseTrendCard;
