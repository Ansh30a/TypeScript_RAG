import { pipeline } from '@xenova/transformers';
import type { Chunk } from '../chunking/types';
import type { EmbeddedChunk } from './types';

let embedder: any = null;

/* 
    --> Lazy-load the embedding model
    --> Ensures we only load it once
*/

async function getEmbedder() {
    if (!embedder) {
        embedder = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }
    return embedder;
};

/*
    --> Embed a single chunk
*/

export async function embedChunk(chunk: Chunk): Promise<EmbeddedChunk> {
    const model = await getEmbedder();

    const output = await model(chunk.content, {
        pooling: "mean",
        normalize: true,
    });
    
    return {
        ...chunk, 
        embedding: Array.from(output.data),
    };
};

/*
    --> Embed multiple chunks
*/

export async function embedChunks(chunks: Chunk[]): Promise<EmbeddedChunk[]> {
    const embedded: EmbeddedChunk[] = [];

    for (const chunk of chunks) {
        embedded.push(await embedChunk(chunk));
    }

    return embedded;
};