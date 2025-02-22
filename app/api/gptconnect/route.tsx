import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: messages,
    });

    if (response.choices && response.choices.length > 0) {
      return NextResponse.json({ result: response.choices[0].message });
    } else {
      throw new Error('No choices in the response');
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
