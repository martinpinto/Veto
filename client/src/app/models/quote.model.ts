import { Topic } from './topic.model'

export interface Quote {
    id: number;
    title: string;
    author: string;
    description: string;
    type: string;
    status: string;
    topic: Topic;
    hashtags: string[];
    votes: number;
    dateCreated: Date;
    dateQuote: Date;
    source: string;
    party: string;
}