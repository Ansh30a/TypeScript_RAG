import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';
import type { Document } from './types';
import { normalizeText } from './normalizeText';

export async function loadPdf(filePath:string): Promise<Document[]> {
    const buffer = await fs.readFile(filePath);
    const uint8 = new Uint8Array(buffer);
    const pdf = new PDFParse(uint8);
    const result = await pdf.getText();

    return [
        {
            id: filePath,
            content: normalizeText(result.text),
            metadata: {
                source: filePath
            },
        },
    ];
};