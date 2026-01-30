import { embeddedFiles } from "bun";
import type { Chunk } from "../chunking/types";

export type EmbeddedChunk = Chunk & {
    embedding: number[];
};