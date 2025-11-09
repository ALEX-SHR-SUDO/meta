import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json(
        { error: 'Pinata API keys not configured' },
        { status: 500 }
      );
    }

    // Create FormData for Pinata
    const pinataFormData = new FormData();
    pinataFormData.append('file', file);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      pinataFormData,
      {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
        maxBodyLength: Infinity,
      }
    );

    const imageUri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    
    return NextResponse.json({ uri: imageUri });
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
