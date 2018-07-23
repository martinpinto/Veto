import { Topic } from './topic.model'
import { Party } from './party.model';
import { User } from './user.model';
import { Politician } from './politician.model';

export interface Quote {
    id: number;
    title: string;
    description: string;
    status: string;
    votes: number;
    dateCreated: Date;
    dateQuote: Date;
    source: string;
    topics: Topic[];
    party: Party;
    user: User;
    politician: Politician;
}