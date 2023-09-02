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
import Button from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import BannerAlert from "@/components/bannerAlert";

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

interface InitialState {
  title: string;
  stack: string;
  content: string;
  code: string;
}

const CreatePage = () => {
  const [stacks, setStacks] = React.useState<Stack[]>([]);
  const [selectedStack, setSelectedStack] = React.useState<string>();
  const { authToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStacks = async () => {
      const response = await ApiService.getStacks();
      setStacks(response.data.stacks);
    };
    fetchStacks();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    getValues,
    setValue,
  } = useForm<InitialState>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<InitialState> = async (formData) => {
    setLoading(true);
    try {
      const res = await ApiService.createPost({
        title: formData.title,
        content: formData.content,
        code: formData.code,
        stack: selectedStack || "",
        token: authToken || "",
      });

      if (res && res.status === 201) {
        router.push(`/questions/${res.data.id}`);
      } else {
        setError(res?.data?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-black-500 text-3xl font-bold">
        Ask a public question
      </h1>
      {error ? (
        <BannerAlert message={error} />
      ) : (
        <div className="my-3 w-1/2 rounded-sm bg-slate-200 p-3">
          Explain how you encountered the problem you’re trying to solve, and
          any difficulties that have prevented you from solving it yourself.
        </div>
      )}
      <div className="flex w-1/2 flex-col">
        <Input
          {...register("title", {
            required: true,
          })}
          error={errors.title?.message}
          label="Title"
          placeholder="e.g. Is there an R function for finding the index of an element in a array?"
          className="mb-4"
        />
        <TextArea
          {...register("content", {
            required: true,
          })}
          onTyping={(val) => setValue("content", val)}
          value={getValues("content")}
          error={errors.content?.message}
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
          onTyping={(val) => setValue("code", val)}
          error={errors.code?.message}
          label="Your code"
          minHeight="10rem"
          placeholder={exampleCode}
        />
        <div className="mt-2" />
        <Button type="submit" disabled={!isValid} loading={loading}>
          Submit your question
        </Button>
      </div>
    </form>
  );
};

export default CreatePage;
