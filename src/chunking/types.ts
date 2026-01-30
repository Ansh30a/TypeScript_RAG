export type Chunk = {
    id: string,
    content: string,
    metadata: {
        source: string,
        page?: number,
        chunkIndex: number
    };
};