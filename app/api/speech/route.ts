import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: 'No audio file provided' }), { status: 400 });
    }

    // ✅ Directly use file
    const response = await openai.audio.transcriptions.create({
      file, // ← the Edge-native File object
      model: 'whisper-1',
      response_format: 'json',
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('[SPEECH_TO_TEXT_ERROR]', error);
    return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
// app/api/speech/route.ts
// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";
// import { auth } from "@clerk/nextjs/server";
// import { checkAndUpdateUsage } from "@/lib/usage";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // ✅ Check and update API usage
//     await checkAndUpdateUsage(userId);

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return new NextResponse("Audio file is required", { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const response = await openai.audio.transcriptions.create({
//       file,
//       model: "whisper-1",
//     });

//     return NextResponse.json(response.text);
//   } catch (error) {
//     console.error("[SPEECH_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
