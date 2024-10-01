import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Add Income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
      console.error("Error adding income:", err);
    }
  };

  // Fetch Incomes
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching incomes");
      console.error("Error fetching incomes:", err);
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting income");
      console.error("Error deleting income:", err);
    }
  };

  // Calculate Total Income
  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  // Add Expense
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
      console.error("Error adding expense:", err);
    }
  };

  // Fetch Expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching expenses");
      console.error("Error fetching expenses:", err);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting expense");
      console.error("Error deleting expense:", err);
    }
  };

  // Calculate Total Expenses
  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  // Calculate Total Balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Get Transaction History (last 3)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
