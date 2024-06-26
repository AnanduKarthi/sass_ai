import { checkApiLImit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("opnAI key missing", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("prompt required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("amount required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution required", { status: 400 });
    }

    const freeTrail = await checkApiLImit();
    const isPro=await checkSubscription()

    if (!freeTrail &&!isPro) {
      return new NextResponse("free trail expired", { status: 403 });
    }
    const response = await openAi.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if(!isPro){
      await increaseApiLimit();
      }
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[Image_error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
