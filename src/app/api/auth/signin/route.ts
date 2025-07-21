import { FormDataUserSchema } from '@/types/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();

    const parsed = FormDataUserSchema.parse(data);

    return NextResponse.json({ message: 'Received!', parsed });
}