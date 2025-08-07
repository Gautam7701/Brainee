"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Mic } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import * as z from "zod";

// const formSchema = z.object({
//   audio: z.any().refine((file) => file instanceof File, {
//     message: "Audio file is required",
//   }),
// });
const formSchema = z.object({
  audio: z
    .instanceof(File, { message: "Audio file is required" }),
});


const SpeechToText = () => {
  const router = useRouter();
  const [transcript, setTranscript] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audio: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setTranscript(null);
      const formData = new FormData();
      formData.append("file", values.audio);

      const response = await axios.post("/api/speech", formData);
      setTranscript(response.data.text);
      form.reset();
    } catch (error: unknown) {
      console.error("Transcription failed:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pb-20">
      <Heading
        title="Speech to Text"
        description="Convert your speech or voice recordings to text."
        icon={Mic}
        iconColoer="text-orange-500"
        bgColor="bg-orange-100"
      />

      <div className="px-4 lg:px-8 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-xl border bg-white w-full p-4 px-3 md:px-6 shadow-sm grid grid-cols-12 gap-2 items-center"
          >
            <FormField
              name="audio"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      disabled={isLoading}
                      className="text-sm text-gray-500"
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
                {isLoading ? "Transcribing..." : "Upload"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Response area */}
        <div className="space-y-4 text-center text-gray-500 text-sm italic mt-6">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!transcript && !isLoading && (
            <Empty label="Upload a voice recording to get started." />
          )}

          {transcript && (
            <div className="p-4 bg-white rounded-xl shadow text-gray-800 text-left text-base">
              <strong>📝 Transcription:</strong>
              <p className="mt-2">{transcript}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
