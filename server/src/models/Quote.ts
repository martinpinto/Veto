import Model from './Model';
import Topic from './Topic';

export default class Quote implements Model {
    public id: number;
    public _name: string;

    public title: string;
    public author: string;
    public description: string;
    public type: string;
    public status: string;
    public topicId: number;
    public topic?: Topic;
    public hashtags: string[];
    public votes: number;
    public dateCreated: string; // should be date YYYY-MM-dd for mysql
    public dateQuote: string; // should be date YYYY-MM-dd for mysql
    public source: string;
    public party: string;
    
    constructor(quote?: Quote) {
        this._name = "Quotes";
        if (quote) {
            this.id = quote.id;
            this.title = quote.title;
            this.author = quote.author;
            this.description = quote.description;
            this.type = quote.type;
            this.status = quote.status;
            this.topicId = quote.topicId;
            this.hashtags = quote.hashtags;
            this.votes = quote.votes;
            this.dateCreated = quote.dateCreated;
            this.dateQuote = quote.dateQuote;
            this.source = quote.source;
            this.party = quote.party;
        }
    }
}

/* Sample JSON:
    "message": {},
    "author": {
      "id": {},
      "role": {},
      "party_id": {}
    },
    "type": {},
    "status": {},
    "topic": {},
    "hashtags": {},
    "votes": {
      "up_vote_count": {},
      "down_vote_count": {}
    },
    "date_created": {},
    "date_quote": {},
    "source": {}
  },
  "party": {
    "id": {},
    "logo_url": {}
  }
*/