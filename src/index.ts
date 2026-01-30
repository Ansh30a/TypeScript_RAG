console.log("TypeScript RAG project initialised 🚀");

import { ingest } from './ingestion';

// const docs = await ingest("./data/sample.txt");
const docs = await ingest("./data/1.pdf");

console.log(docs[0]?.content.slice(0, 200));