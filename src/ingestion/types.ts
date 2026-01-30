export type Document = {
    id: string,
    content: string,
    metadata: {
        source: string,
        page?:number
    };
};