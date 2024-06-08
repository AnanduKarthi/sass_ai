import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLImit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("opnAI key missing", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("message required", { status: 400 });
    }

    const freeTrail = await checkApiLImit();
    const isPro=await checkSubscription()

    if (!freeTrail &&!isPro) {
      return new NextResponse("free trail expired", { status: 403 });
    }

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    if(!isPro){
    await increaseApiLimit();
    }


    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[conversation_error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
