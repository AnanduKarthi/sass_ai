import { checkApiLImit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt required", { status: 400 });
    }

    const freeTrail = await checkApiLImit();
    const isPro=await checkSubscription()

    if (!freeTrail &&!isPro) {
      return new NextResponse("free trail expired", { status: 403 });
    }


    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    await increaseApiLimit();
    return NextResponse.json(response);
  } catch (error) {
    console.log("[video_error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
