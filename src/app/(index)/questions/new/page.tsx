"use client";

import React from "react";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApiService from "@/utils/ApiService";

const exampleCode = `let arr = ["apple", "banana", "cherry", "apple", "banana"];

let findFirstMatch = (array, matchString) => {
    let index = array.indexOf(matchString);
    return index; 
}

console.log(findFirstMatch(arr, "banana")); // Output: 1
console.log(findFirstMatch(arr, "pear")); // Output: -1
`;

interface Stack {
  id: string;
  name: string;
}
const CreatePage = () => {
  const [stacks, setStacks] = React.useState<Stack[]>([]);
  const [selectedStack, setSelectedStack] = React.useState<string>();

  React.useEffect(() => {
    const fetchStacks = async () => {
      const response = await ApiService.getStacks();
      setStacks(response.data.stacks);
    };
    fetchStacks();
  }, []);

  React.useEffect(() => {
    console.log(selectedStack);
  }, [selectedStack]);

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-black-500 text-3xl font-bold">
        Ask a public question
      </h1>
      <div className="my-3 w-1/2 rounded-sm bg-slate-200 p-3">
        Explain how you encountered the problem you’re trying to solve, and any
        difficulties that have prevented you from solving it yourself.
      </div>
      <div className="flex w-1/2 flex-col">
        <Input
          label="Title"
          placeholder="e.g. Is there an R function for finding the index of an element in a array?"
          className="mb-4"
        />
        <TextArea
          label="What are the details of your problem?"
          placeholder="e.g. I have an array of strings, and I want to find the index of the first occurrence of a particular string."
          className="mb-4"
          minHeight="5rem"
        />
        <label className="text-black-500 text-sm font-bold" htmlFor="stack">
          Stack
        </label>
        <Select onValueChange={setSelectedStack}>
          <SelectTrigger id="stack" className="mb-4 w-[180px]">
            <SelectValue placeholder="Select a stack" />
          </SelectTrigger>
          <SelectContent>
            {stacks?.length > 0 &&
              stacks?.map((stack) => (
                <SelectItem key={stack.id} value={stack.name}>
                  {stack.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <TextArea
          label="Your code"
          minHeight="10rem"
          placeholder={exampleCode}
        />
      </div>
    </div>
  );
};

export default CreatePage;
