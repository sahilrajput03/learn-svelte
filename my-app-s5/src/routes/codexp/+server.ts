import { json } from "@sveltejs/kit"

const sampleFilePath = '/Users/apple/Documents/test/qr-solution/qr-solution-backend/routes/whatsAppRouter.ts'

export function GET() {
    // const search =  url.searchParams.get('filePath');
    // return json({ filePath });
    return json({ message: 'Hello world 2' })
}
