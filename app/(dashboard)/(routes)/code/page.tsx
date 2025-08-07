

"use client";
import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constant";
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
import Useravatar from "@/components/User-avatar";
import Botavatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      const assistantMessage: ChatMessage = response.data;
      setMessages((current) => [...current, userMessage, assistantMessage]);
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pb-20">
      <Heading
        title="Code Assistant"
        description="Instantly generate or debug code using AI assistance."
        icon={Code}
        iconColoer="text-green-500"
        bgColor="bg-green-100"
      />

      <div className="px-4 lg:px-8 mt-6 max-w-5xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-xl border shadow-md p-4 md:p-6 flex flex-col md:flex-row items-center gap-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full flex-grow">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent text-base placeholder:text-gray-500"
                      disabled={isLoading}
                      placeholder="Ask me anything... like 'Generate a REST API with Express.js'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Thinking..." : "Generate"}
            </Button>
          </form>
        </Form>

        <div className="mt-10 space-y-6">
          {isLoading && (
            <div className="p-6 bg-muted rounded-lg flex items-center justify-center">
              <Loader />
            </div>
          )}

          {!isLoading && messages.length === 0 && (
            <Empty label="Start a conversation by asking a question!" />
          )}

          <div className="flex flex-col gap-y-4">
            {messages.map((message, index) => (
              <div
                key={message.content + index}
                className={`flex items-start gap-4 rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-900 justify-end self-end"
                    : "bg-gray-100 text-gray-800 justify-start self-start"
                }`}
              >
                <div className="shrink-0">
                  {message.role === "user" ? <Useravatar /> : <Botavatar />}
                </div>
                <ReactMarkdown
                  components={{
                    pre: (props ) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-3 rounded-lg text-sm">
                        <pre {...props} />
                      </div>
                    ),
                    code: (props) => (
                      <code className="bg-black/10 rounded px-1 py-0.5" {...props} />
                    ),
                  }}
                  
                >
                  {message.content || "No content provided."}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
