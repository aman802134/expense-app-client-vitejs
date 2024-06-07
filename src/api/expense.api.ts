import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createExpense = async (data: FormData) =>
  api.post("/api/expense/create", data);

export const fetchCategories = async () => api.get("api/expense/categories");
export const fetchExpenses = async () => api.get("api/expense/expenses");
