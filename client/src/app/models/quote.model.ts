export interface Quote {
    _id: number;
    title: string;
    author: string;
    description: string;
    type: string;
    status: string;
    topic: string;
    hashtags: string[];
    votes: number;
    dateCreated: Date;
    dateQuote: Date;
    source: string;
    party: string;
}