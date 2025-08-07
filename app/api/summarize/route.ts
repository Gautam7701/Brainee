import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    if (!prompt) {
      return new NextResponse(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes long text into concise summaries.",
        },
        {
          role: "user",
          content: `Please summarize this text:\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    const summary = response.choices[0]?.message?.content?.trim();

    if (!summary) {
      return new NextResponse(JSON.stringify({ error: 'Failed to generate summary' }), {
        status: 500,
      });
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary API error:", error);
    return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}

// app/api/summary/route.ts

// import { auth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
// import { checkAndUpdateUsage } from '@/lib/usage'; // ✅ usage limiter

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await request.json();
//     const { prompt } = body;

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
//         status: 401,
//       });
//     }

//     // ✅ Enforce API usage limit
//     try {
//       await checkAndUpdateUsage(userId);
//     } catch (limitError: any) {
//       return new NextResponse(JSON.stringify({ error: limitError.message }), {
//         status: 429,
//       });
//     }

//     if (!prompt) {
//       return new NextResponse(JSON.stringify({ error: 'Prompt is required' }), {
//         status: 400,
//       });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant that summarizes long text into concise summaries.",
//         },
//         {
//           role: "user",
//           content: `Please summarize this text:\n\n${prompt}`,
//         },
//       ],
//       temperature: 0.7,
//     });

//     const summary = response.choices[0]?.message?.content?.trim();

//     if (!summary) {
//       return new NextResponse(JSON.stringify({ error: 'Failed to generate summary' }), {
//         status: 500,
//       });
//     }

//     return NextResponse.json({ summary });
//   } catch (error) {
//     console.error("Summary API error:", error);
//     return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
//       status: 500,
//     });
//   }
// }
