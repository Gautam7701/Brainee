import  {auth}  from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage = {
  role: "system",
  content: "You are a code generator. Generate code based on the user's request.",
};


export async function POST(request: Request) {
  try {
    const{userId}= await auth();
    const body = await request.json();
    const { messages } = body;

    if(!userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }


    if (!openai.apiKey) {
      return new NextResponse(JSON.stringify({ error: 'OpenAI API key is not set' }), {
        status: 500,
      });
    }

    if( !messages || messages.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
      });
    }

   const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [systemMessage, ...messages],
  max_tokens: 1000,
});
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}

// import { auth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
// import { checkAndUpdateUsage } from '@/lib/usage'; // 👈 import usage checker

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const systemMessage = {
//   role: "system",
//   content: "You are a code generator. Generate code based on the user's request.",
// };

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     // ✅ Check and update API usage
//     await checkAndUpdateUsage(userId);

//     const body = await request.json();
//     const { messages } = body;

//     if (!messages || messages.length === 0) {
//       return new NextResponse(JSON.stringify({ error: 'Messages are required' }), { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [systemMessage, ...messages],
//       max_tokens: 1000,
//     });

//     return NextResponse.json(response.choices[0].message);

//   } catch (error: any) {
//     const message = error.message || 'Something went wrong';
//     const status = message.includes("API limit") ? 429 : 500;

//     return new NextResponse(JSON.stringify({ error: message }), { status });
//   }
// }
