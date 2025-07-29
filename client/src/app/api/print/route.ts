import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl } = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileUrl }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to send print job' }, { status: response.status });
    }
    return NextResponse.json({ message: 'Print job sent successfully' });
  } catch (error) {
    console.error('Error handling print:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
