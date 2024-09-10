// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function GET(req: NextRequest) {
//     try {
//         console.log('Current PWD: ', process.cwd());

//         // Try multiple possible locations for the CSS file
//         const possiblePaths = [
//             path.join(process.cwd(), 'src', 'app', 'globals.css'),
//             path.join(process.cwd(), 'styles', 'globals.css'),
//             path.join(process.cwd(), 'public', 'styles', 'globals.css'),
//         ];

//         let cssPath = '';
//         for (const p of possiblePaths) {
//             if (fs.existsSync(p)) {
//                 cssPath = p;
//                 break;
//             }
//         }

//         if (!cssPath) {
//             throw new Error('CSS file not found');
//         }

//         const fileContents = fs.readFileSync(cssPath, 'utf8');
//         return new NextResponse(fileContents, {
//             status: 200,
//             headers: {
//                 'Content-Type': 'text/css',
//             },
//         });
//     } catch (error) {
//         console.error('Error reading CSS file:', error);
//         const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//         return new NextResponse(JSON.stringify({ error: 'Error reading CSS file', details: errorMessage }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
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