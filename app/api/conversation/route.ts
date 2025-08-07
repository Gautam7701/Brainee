import  {auth}  from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  messages: messages,
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
// import { checkAndUpdateUsage } from '@/lib/usage'; // 🧠 your usage limit function

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await request.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     // ✅ Check usage limit
//     try {
//       await checkAndUpdateUsage(userId);
//     } catch (limitError: any) {
//       return new NextResponse(JSON.stringify({ error: limitError.message }), { status: 429 });
//     }

//     if (!openai.apiKey) {
//       return new NextResponse(JSON.stringify({ error: 'OpenAI API key is not set' }), { status: 500 });
//     }

//     if (!messages || messages.length === 0) {
//       return new NextResponse(JSON.stringify({ error: 'Messages are required' }), { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: messages,
//       max_tokens: 1000,
//     });

//     return NextResponse.json(response.choices[0].message);
//   } catch (error) {
//     console.error(error);
//     return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
//   }
// }
