import { executeQuery } from '@/lib/db';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ClientCode = searchParams.get('ClientCode');
        const UserName = searchParams.get('UserName');

        if (!ClientCode || !UserName) {
            return NextResponse.json({ URL: "", message: 'ClientCode and UserName are required', status: 400 });
        }

        const result = await executeQuery(ClientCode.toString(), UserName.toString());

        if (result.length > 0) {
            return NextResponse.json({ URL: result[0].BaseURL, message: 'Success', status: 200 });
        } else {
            return NextResponse.json({ URL: "", message: 'Not Found', status: 404 });
        }
    } catch (err: any) {
        return NextResponse.json({ URL: "", message: 'Server error', status: 500, error: err.message });
    }
}
