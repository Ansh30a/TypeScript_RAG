import { ingest } from "./ingestion";
import { chunkDocuments } from "./chunking";
import { embedChunks } from "./embeddings/embedder";

const docs = await ingest("./data/sample.txt");
const chunks = chunkDocuments(docs);
const embedded = await embedChunks(chunks);

console.log("Embedding dimension:", embedded[0]?.embedding.length);
console.log("Sample vector slice:", embedded[0]?.embedding.slice(0, 5));







// console.log("TypeScript RAG project initialised 🚀");

// import { ingest } from './ingestion';
// import { chunkDocuments } from './chunking';

// // const docs = await ingest("./data/sample.txt");
// const docs = await ingest("./data/1.pdf");

// // console.log(docs[0]?.content.slice(0, 200));

// const chunks = chunkDocuments(docs);

// console.log("Total chunks:", chunks.length);
// console.log(chunks[0]);