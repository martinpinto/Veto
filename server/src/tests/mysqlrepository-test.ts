import MySqlRepository from '../databases/mysql/MySqlRepository';
import Quote from '../models/Quote';
import Topic from '../models/Topic';

import { expect } from 'chai';
import { reporters } from 'mocha';

var topic: Topic = {
    id: -1,
    _type: 'Topics',
    dateCreated: '2017-12-10',
    title: 'peace'
}

var quote : Quote = {
    id: -1,
    _type: "Quotes",
    title: "Sample title",
    author: "Sample author",
    description: "Sample description",
    type: "Sample type",
    status: "Sample status",
    topicId: 1,
    topic: topic,
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