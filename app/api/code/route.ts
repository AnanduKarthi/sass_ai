import { checkApiLImit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);
const instractionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "you are a code generator , you must only replay in markdown code snippet,use code comments for explanation",
};
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

    if (!freeTrail) {
      return new NextResponse("free trail expired", { status: 403 });
    }

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instractionMessage, ...messages],
    });

    await increaseApiLimit();
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[code_error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
