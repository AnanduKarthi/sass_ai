"use client";

import axios from "axios";
import * as z from "zod";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { userProModel } from "@/hooks/use-pro-model";

export default function MusicPage() {
  const [music, setMusic] = useState<string>();
  const proModel = userProModel();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const isSubmitting = async (value: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", value);
      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      // Todo open pro model
      if (error?.response?.status === 403) {
        proModel.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music generation"
        description="Our most advanced conversation model"
        icon={Music}
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(isSubmitting)}
              className="rounded-lg w-full border p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 ">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="violin solo"
                        className="border-0 outline-none focus-within:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex justify-center items-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No music generate" />}
          {music && (
            <audio controls className=" w-full  mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}
