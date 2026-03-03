import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', description: '' });

  const handleOpen = (expense) => {
    setSelectedExpense(expense);
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExpense(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onEdit(selectedExpense.id, {
      ...form,
      amount: parseFloat(form.amount)
    });
    handleClose();
  };

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Expense List</h2>
      {expenses.length === 0 && <p className="expense-list-empty">No expenses found.</p>}
      {expenses.map(expense => (
        <div key={expense.id} className="expense-card">
          <div className="expense-card-header">
            <b className="expense-title">{expense.title}</b>
            <span className="expense-amount">RS.{expense.amount}</span>
          </div>
          <div className="expense-details">
            <span style={{ marginRight: '1rem' }}><b>Category:</b> {expense.category}</span>
          </div>
          <div className="expense-details">
            <span style={{ marginRight: '1rem' }}><b>Date:</b> {expense.date}</span>
          </div>
          <div className="expense-description"><b>Description:</b> {expense.description}</div>
          <div className="expense-actions">
            <button className="expense-btn" onClick={() => handleOpen(expense)}>Edit</button>
            <button className="expense-btn delete" onClick={() => onDelete(expense.id)}>Delete</button>
          </div>
        </div>
      ))}
      {open && (
        <div className="expense-modal-overlay">
          <div className="expense-modal">
            <h3 className="expense-modal-title">Edit Expense</h3>
            <form className="expense-modal-form" onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" /><br />
              <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" /><br />
              <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" /><br />
              <input type="date" name="date" value={form.date} onChange={handleChange} /><br />
              <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" /><br />
              <div className="expense-modal-actions">
                <button type="submit" className="expense-btn">Update</button>
                <button type="button" className="expense-btn cancel" onClick={handleClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;