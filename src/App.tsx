import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "@/Layout/RootLayout";
import HomePage from "@/pages/HomePage";
import ExpensePage from "@/pages/ExpensePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "expense",
        element: <ExpensePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
