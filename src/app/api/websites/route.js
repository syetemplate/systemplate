import { NextResponse } from 'next/server';
import websitesData from './websitesData.json';

export async function GET() {
    return NextResponse.json(websitesData);
};
