import { json } from "@sveltejs/kit"
import fs from 'fs'

const sampleFilePath = '/Users/apple/Documents/test/qr-solution/qr-solution-backend/routes/whatsAppRouter.ts'

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export function GET() {
    // const search =  url.searchParams.get('filePath');
    // return json({ filePath });
    return json({ code: readFile(sampleFilePath) })
}
