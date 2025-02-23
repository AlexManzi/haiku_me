import { NextRequest, NextResponse } from 'next/server';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const client = new PollyClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const command = new SynthesizeSpeechCommand({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Joanna',
  });

  try {
    const data = await client.send(command);
    return new NextResponse(data.AudioStream as any, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
