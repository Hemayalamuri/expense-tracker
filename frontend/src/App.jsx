import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Summary from './components/Summary';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [expenses, setExpenses] = useState([]);
  const [tab, setTab] = useState('dashboard');

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/expenses", { credentials: 'include' });
    if (res.status === 401) {
      setIsLoggedIn(false);
      setAuthPage("login");
      setExpenses([]);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchExpenses();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // On initial load, check if the user is authenticated
    const checkAuth = async () => {
      const res = await fetch("http://localhost:5000/expenses", { credentials: 'include' });
      if (res.status === 401) {
        setIsLoggedIn(false);
        setAuthPage("login");
        setExpenses([]);
      } else if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setIsLoggedIn(true);
          setExpenses(data);
        } else {
          setIsLoggedIn(false);
          setAuthPage("login");
          setExpenses([]);
        }
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include"
    });
    setIsLoggedIn(false);
    setAuthPage("login");
  };

  if (!isLoggedIn) {
    return authPage === "login" ? (
      <Login onLogin={() => { setIsLoggedIn(true); fetchExpenses(); }} onSwitch={() => setAuthPage("register")} />
    ) : (
      <Register onSwitch={() => setAuthPage("login")} />
    );
  }

  const addExpense = async (expense) => {
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
      credentials: 'include'
    });
    await fetchExpenses();
  };

  const editExpense = async (id, updatedExpense) => {
    await fetch(`http://localhost:5000/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense)
    });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5000/expenses/${id}`, {
      method: "DELETE"
    });
    fetchExpenses();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Expense Tracker</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setTab('dashboard')} style={{ fontWeight: tab === 'dashboard' ? 'bold' : 'normal' }}>Dashboard</button>
          <button onClick={() => setTab('add')} style={{ fontWeight: tab === 'add' ? 'bold' : 'normal' }}>Add Expense</button>
          <button onClick={() => setTab('all')} style={{ fontWeight: tab === 'all' ? 'bold' : 'normal' }}>All Expenses</button>
        </div>
      </div>
      {tab === 'dashboard' && <Dashboard expenses={expenses} addExpense={addExpense} />}
      {tab === 'add' && <ExpenseForm addExpense={addExpense} />}
      {tab === 'all' && <>
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} onEdit={editExpense} onDelete={deleteExpense} />
      </>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default App;