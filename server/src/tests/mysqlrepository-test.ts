import MySqlRepository from '../databases/mysql/MySqlRepository';
import Quote from '../models/Quote';
import Topic from '../models/Topic';
import Party from '../models/Party';
import Politician from '../models/Politician';

import { expect } from 'chai';
import { reporters } from 'mocha';
import User from '../models/User';

/*
var topics: Topic[] = [{
    id: -1,
    _type: 'Topics',
    dateCreated: '2017-12-10',
    title: 'peace'
}];

var politician: Politician = {
    id: -1,
    _type: 'Politicians',
    firstname: 'First',
    lastname: 'Name',
    role: 'Role',
    avatar: 'Test',
    votes: 1,
    party: party,
    partyId: -1
};

var party: Party = {
    id: -1,
    _type: "Parties",
    name: 'Test',
    logo: 'test',
    link: 'test'
};

var user: User = {
    id: -1,
    _type: "Users",
    firstname: "First",
    lastname: "Name",
    username: "@username", // @ symbol
    password: "secure",
    email: "secure@mail.com"
}

var quote: Quote = {
    id: -1,
    _type: "Quotes",
    title: "Sample title",
    description: "Sample description",
    status: "Sample status",
    votes: 1,
    dateCreated: '2017-12-31',
    dateQuote: '2017-12-10',
    source: "Sample source",
    partyId: 1,
    party: party,
    userId: 1,
    user: user,
    politicianId: 1,
    politician: politician
};

describe('INSERT statement', () => {
    it('should insert a new quote', () => {
        let repository : MySqlRepository = new MySqlRepository();
        repository.create(quote, quote._type);
    });
});

describe('COUNT statement', () => {
    it('should count the number of quotes', () => {
        let repository : MySqlRepository = new MySqlRepository();
        let count = repository.count('Quotes');
        console.log(count);
        expect(count).to.be.equal(3);
    });
});
*/