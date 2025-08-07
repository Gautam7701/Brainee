"use client";
import React, { useState } from "react";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
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
// import {ChatCompletionRequestMessage} from "openai"

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Conversation = () => {

  const router = useRouter();

  const [messages,setMessages]= useState<ChatMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const userMessage: ChatMessage = {
        role: "user",
        content: values.prompt,
      };
      const newmessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation",{
        messages: newmessages,
      });
      const assistantMessage: ChatMessage = response.data;
      setMessages((current)=>[...current, userMessage, assistantMessage]);
      form.reset();
    }
    catch(error:unknown){
      //TODO OPEN PRO MODEL
      if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data || error.message);
  } else {
    console.error("Unexpected error:", error);
  }
    }
    finally{
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pb-20">
      <Heading
        title="Chat Bot"
        description="Chat with an AI assistant for ideas, help, or fun"
        icon={MessageSquare}
        iconColoer="text-violet-500"
        bgColor="bg-violet-100"
      />

      <div className="px-4 lg:px-8 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-xl border bg-white w-full p-4 px-3 md:px-6 shadow-sm
            grid grid-cols-12 gap-2 items-center"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent text-base placeholder:text-gray-400"
                      disabled={isLoading}
                      placeholder="Ask me anything... like 'Explain quantum computing in simple terms'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="col-span-12 lg:col-span-2 flex justify-end">
              <Button
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Thinking..." : "Generate"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Response area */}
        <div className="space-y-4 text-center text-gray-500 text-sm italic">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader/>

            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start a conversation by asking a question!" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={message.content + index}
                className={`p-4 rounded-lg flex items-start gap-x-8 ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-800 self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {message.role === "user"? <Useravatar/>:<Botavatar/>}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
