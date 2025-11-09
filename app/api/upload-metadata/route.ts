import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const metadata = await request.json();

    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json(
        { error: 'Pinata API keys not configured' },
        { status: 500 }
      );
    }

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
      }
    );

    const metadataUri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    
    return NextResponse.json({ uri: metadataUri });
  } catch (error) {
    console.error('Error uploading metadata to Pinata:', error);
    return NextResponse.json(
      { error: 'Failed to upload metadata' },
      { status: 500 }
    );
  }
}
