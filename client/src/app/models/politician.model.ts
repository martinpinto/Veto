import { Party } from "./party.model";

export interface Politician {
    id : number;
    firstname: string;
    lastname: string;
    role: string;
    avatar: string;
    votes: number;
    Party: Party;
}