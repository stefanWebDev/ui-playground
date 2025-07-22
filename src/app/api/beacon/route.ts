
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';


export async function POST(request: NextRequest) {

  const data = await request.json();
  const fingerprint = data.fingerprint || '';
  const hash = crypto.createHash('sha256').update(fingerprint).digest('hex');

  console.log("Beacon received: user changed page, tracking user journey, url:", data.url, "Hashed fingerprint:", hash);


  return NextResponse.json(
    { message: 'Dummy reponse, not needed for sendBeacon but reuquired for HTTP standard' },
    { status: 200 }
  );
}
