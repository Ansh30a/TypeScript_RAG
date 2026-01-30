import type { Document } from '../ingestion/types';
import type { Chunk } from './types';

type ChunkOptions = {
    chunkSize: number,
    overlap: number
};

export function chunkDocument(doc:Document, options:ChunkOptions): Chunk[] {
    const { chunkSize, overlap } = options;

    const text = doc.content;
    const chunks: Chunk[] = [];

    let start = 0;
    let index = 0;

    while (start < text.length) {
        const end = start + chunkSize;
        const slice = text.slice(start, end);

        chunks.push(
            {
                id: `${doc.id}::chunk_${index}`,
                content: slice,
                metadata: {
                    ...doc.metadata,
                    chunkIndex: index,
                },
            }
        );

        start += chunkSize - overlap;
        index++;
    }
    return chunks;
};
