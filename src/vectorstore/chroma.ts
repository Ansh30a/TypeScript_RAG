import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import type { EmbeddedChunk } from '../embeddings/types';

export class ChromaVectorStore {
    private client: ChromaClient;
    private collection!: Collection;

    constructor(private collectionName: string = "rag_chunks") {
        this.client = new ChromaClient({
            // path: "./chroma_db",
            host: "localhost",
            port: 8000,
            ssl: false,
        });
    }

    /*
        --> Initialize or load collection
   */

    async init() {
        this.collection = await this.client.getOrCreateCollection({
            name: this.collectionName,
            embeddingFunction: null,
        });
    }

    /*
        --> Store Embedded Chunks
    */

    async addChunks(chunks: EmbeddedChunk[]) {
        await this.collection.add({
            ids: chunks.map((c) => c.id),
            embeddings: chunks.map((c) => c.embedding),
            documents: chunks.map((c) => c.content),
            metadatas: chunks.map((c) => c.metadata),
        });
    }

    /*
        --> Similarity search
    */
    
    async similaritySearch(queryEmbedding: number[], topK: number) {
        const results = await this.collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: topK,
        });
        return results;
    }
}
