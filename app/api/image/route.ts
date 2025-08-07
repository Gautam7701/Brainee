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
    const { prompt, amount = 1, resolution="512*512" } = body;

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

    if( !prompt || prompt.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      });
    }
    if( !amount || amount.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Amount is required' }), {
        status: 400,
      });
    }
    if( !resolution) {
      return new NextResponse(JSON.stringify({ error: 'Resolution is required' }), {
        status: 400,
      });
    }

   const response = await openai.images.generate({
        prompt: prompt,
        n: parseInt(amount, 10),
        size: resolution,
   });
    return NextResponse.json(response.data);
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
// import { checkAndUpdateUsage } from '@/lib/usage'; // 👈 make sure this is imported

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await request.json();
//     const { prompt, amount = 1, resolution = "512x512" } = body;

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     // ✅ Check usage limit before generating image
//     try {
//       await checkAndUpdateUsage(userId);
//     } catch (limitError: any) {
//       return new NextResponse(JSON.stringify({ error: limitError.message }), { status: 429 });
//     }

//     if (!openai.apiKey) {
//       return new NextResponse(JSON.stringify({ error: 'OpenAI API key is not set' }), { status: 500 });
//     }

//     if (!prompt || prompt.length === 0) {
//       return new NextResponse(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
//     }

//     const response = await openai.images.generate({
//       prompt: prompt,
//       n: parseInt(amount, 10),
//       size: resolution,
//     });

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error(error);
//     return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
//   }
// }
