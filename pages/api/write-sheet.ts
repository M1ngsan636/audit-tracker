import type { NextApiRequest, NextApiResponse } from 'next';
import { appendRow } from '@/lib/googleSheets'; // Adjust if you're not using alias

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      await appendRow(SPREADSHEET_ID, 'Sheet1!A1', [name, email, new Date().toISOString()]);
      res.status(200).json({ message: 'Row added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to write to sheet' });
    }
  } else {
    res.status(405).end();
  }
}
