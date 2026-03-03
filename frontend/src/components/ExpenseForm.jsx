import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !amount || !date || !category || !description) return;
    addExpense({title, amount: parseFloat(amount), category, date, description});
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Expense title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;