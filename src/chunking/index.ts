import type { Document } from '../ingestion/types';
import { chunkDocument } from './textChunker';
import type { Chunk } from './types';

export function chunkDocuments(docs:Document[]): Chunk[] {
    return docs.flatMap(doc =>
        chunkDocument(doc, {
            chunkSize: 500,
            overlap: 150
        })
    );
};