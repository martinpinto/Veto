import Model from './Model';

export class Quote extends Model {
    constructor(quote) {
        super();
        this._name = "Quote";
        if (typeof quote !== 'undefined') {
            this.title = quote.title;
            this.author = quote.author;
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