export interface CategoryType {
  _id: string;
  name: string;
}
export interface Expense {
  description: string;
  price: string;
  category: {
    name: string;
  };
  createdAt: string;
}
