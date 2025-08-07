"use client";
import React, { useState } from "react";
import Heading from "@/components/Heading";
import { FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

// Define schema
const formSchema = z.object({
  prompt: z.string().min(10, "Please enter a longer text to summarize"),
});

const TextSummarization = () => {
  const router = useRouter();
  const [summary, setSummary] = useState<string>();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSummary(undefined);
      const response = await axios.post("/api/summarize", values);
      setSummary(response.data.summary);
      form.reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 pb-20">
      <Heading
        title="Text Summarizer"
        description="Summarize long articles or content into short, clear summaries."
        icon={FileText}
        iconColoer="text-yellow-500"
        bgColor="bg-yellow-100"
      />

      <div className="px-4 lg:px-8 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-xl border bg-white w-full p-4 px-3 md:px-6 shadow-sm grid grid-cols-12 gap-2 items-center"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent text-base placeholder:text-gray-400"
                      disabled={isLoading}
                      placeholder="Paste your long text here to summarize..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="col-span-12 flex justify-end">
              <Button
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Summarizing..." : "Summarize"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="space-y-4 mt-8 text-gray-700">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!summary && !isLoading && (
            <Empty label="Paste your text above and hit summarize." />
          )}
          {summary && (
            <div className="p-4 bg-white rounded-lg shadow-sm border text-base">
              <strong>Summary:</strong>
              <p className="mt-2 whitespace-pre-wrap">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextSummarization;
