import Model from './Model';

export default class Quote implements Model {
    public _id: string;
    public _name: string;

    public title: string;
    public author: string;
    public description: string;
    public type: string;
    public status: string;
    public topic: string;
    public hashtags: string[];
    public votes: number;
    public dateCreated: string; // should be date YYYY-MM-dd for mysql
    public dateQuote: string; // should be date YYYY-MM-dd for mysql
    public source: string;
    public party: string;
    
    constructor(quote: Quote) {
        this._name = "Quotes";
        
        if (quote) {
            this._id = quote._id;
            this.title = quote.title;
            this.author = quote.author;
            this.description = quote.description;
            this.type = quote.type;
            this.status = quote.status;
            this.topic = quote.topic;
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