import Model from './Model';

export class Quote extends Model {
    public title: string;
    public author: string;
    public description: string;
    public type: string;
    public status: string;
    public topic: string;
    public hashtags: string[];
    public votes: number;
    public dateCreated: Date;
    public dateQuote: Date;
    public source: string;
    public party: string;
    
    constructor(quote: Quote) {
        super(quote);
        this._name = "Quote";
        
        if (typeof quote !== 'undefined') {
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
            this.party= quote.party;
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