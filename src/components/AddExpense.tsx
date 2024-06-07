// import { Link } from "react-router-dom";

import { createExpense, fetchCategories } from "@/api/expense.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// option comp
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { CategoryType } from "@/typings/expense.types";
import { useNavigate } from "react-router-dom";

export function AddExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      navigate("/expense");
      console.log("creating expense successfull");
    },
    onError: () => {
      console.log("expense creation failed");
    },
  });

  const handleClick = () => {
    const formData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("category", category);
    mutation.mutate(formData);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add Expense</CardTitle>
        <CardDescription>
          Enter your information regarding your expense.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid  gap-4">
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                id="desc"
                placeholder="chai..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">price</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                required
              />
            </div>
          </div>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {data?.data.categories.map((cat: CategoryType) => {
                return (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Button onClick={handleClick} type="submit" className="w-full">
            Create Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
