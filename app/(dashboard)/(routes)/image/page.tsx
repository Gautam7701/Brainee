"use client";
import React, { useState } from "react";
import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImageGen = () => {

  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);
      const imgUrls = response.data.map((image: { url: string }) => image.url);
      setImages(imgUrls);
      form.reset();
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pb-20">
      <Heading
        title="Image Generation"
        description="Create stunning images from text prompts."
        icon={ImageIcon}
        iconColoer="text-pink-500"
        bgColor="bg-pink-100"
      />
      <div className="px-4 lg:px-8 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-xl border bg-white w-full p-4 px-3 md:px-6 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full lg:flex-1">
                  <FormControl>
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-transparent text-base placeholder:text-gray-400"
                      disabled={isLoading}
                      placeholder="Imagine a futuristic city on Mars at sunset — then watch it come to life"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full lg:w-40 ">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border border-gray-300 hover:bg-gray-100 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={String(option.value)} className="data-[state=checked]:bg-blue-600 data-[highlighted]:bg-blue-500 data-[state=checked]:text-white data-[highlighted]:text-white">
                          {option.label} 
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full lg:w-40">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border border-gray-300 hover:bg-gray-100 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="data-[state=checked]:bg-blue-600 data-[highlighted]:bg-blue-500 data-[state=checked]:text-white data-[highlighted]:text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="w-full lg:w-auto">
              <Button
                className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white"
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
              <Loader />

            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src)=>(
              <Card key={src} className="rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                  alt="Generated Image"
                  fill
                  src={src}
                  />
                </div>
                <CardFooter className="p-2">
                  <Button onClick={()=>window.open(src)} variant="secondary" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2"/>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;

