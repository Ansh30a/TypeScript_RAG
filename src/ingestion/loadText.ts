import fs from 'fs/promises';
import path, { normalize } from 'path';
import type { Document } from './types';
import { normalizeText } from './normalizeText';

export async function loadTextFile(filePath:string): Promise<Document[]> {
    const absolutePath = path.resolve(filePath);
    const rawText = await fs.readFile(absolutePath, "utf-8");

    return [
        {
            id: absolutePath,
            content: normalizeText(rawText),
            metadata: {
                source: absolutePath,
            },
        },
    ];
};