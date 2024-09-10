import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const cssPath = path.join(process.cwd(), 'src', 'app', 'globals.css');
        if (fs.existsSync(cssPath)) {
            const fileContents = fs.readFileSync(cssPath, 'utf8');
            return new NextResponse(fileContents, {
                status: 200,
                headers: { 'Content-Type': 'text/css' },
            });
        } else {
            throw new Error('CSS file not found');
        }
    } catch (error) {
        console.error('Error reading CSS file:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ error: 'Error reading CSS file', details: errorMessage }, { status: 500 });
    }
}