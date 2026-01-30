import { loadTextFile } from './loadText';
import { loadPdf } from './loadPdf';
import type { Document } from './types';

export async function ingest(sourcePath:string): Promise<Document[]> {
    if (sourcePath.endsWith(".txt")) {
        return loadTextFile(sourcePath);
    }

    if (sourcePath.endsWith(".pdf")) {
        return loadPdf(sourcePath);
    }

    throw new Error(`Unsupported File Type: ${sourcePath}`);
};