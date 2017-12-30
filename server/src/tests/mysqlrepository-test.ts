import MySqlRepository from '../databases/mysql/MySqlRepository';
import Quote from '../models/Quote';

import { expect } from 'chai';
import { reporters } from 'mocha';

var quote : Quote = {
    _id: '-1',
    _name: "Quotes",
    title: "Sample title",
    author: "Sample author",
    description: "Sample description",
    type: "Sample type",
    status: "Sample status",
    topic: "Sample topic",
    hashtags: ["Sample hashtag"],
    votes: 1,
    dateCreated: '2017-12-31',
    dateQuote: '2017-12-10',
    source: "Sample source",
    party: "Sample party",
};

describe('INSERT statement', () => {
    it('should insert a new quote', () => {
        let repository : MySqlRepository = new MySqlRepository();
        repository.create(quote, quote._name);
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