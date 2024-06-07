import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "@/api/expense.api";
import { Expense } from "@/typings/expense.types";
const ExpenseTable = () => {
  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Your Expenses</CardTitle>
        <CardDescription>Recent expense from your wallet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.expenses.map((ex: Expense) => {
              return (
                <TableRow>
                  <TableCell>
                    <div className="font-medium">{ex.description}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {ex.category.name}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {ex.createdAt}
                  </TableCell>
                  <TableCell className="text-right">₹{ex.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseTable;
