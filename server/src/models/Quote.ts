import Model from './Model';
import Topic from './Topic';
import User from './User';
import Politician from './Politician';
import Party from './Party';

export default class Quote implements Model {
    public id: number;
    public _type: string;

    public title: string;
    public description: string;
    public status: string;
    public votes: number;
    public dateCreated: string; // should be date YYYY-MM-dd for mysql
    public dateQuote: string; // should be date YYYY-MM-dd for mysql
    public source: string;
    public party: Party;
    public partyId: number;
    public userId: number;
    public user?: User;
    public politicianId: number;
    public politician: Politician;
    
    constructor(quote?: Quote) {
        this._type = "Quotes";

        if (quote) {
            this.id = quote.id;
            this.title = quote.title;
            this.description = quote.description;
            this.status = quote.status;
            this.votes = quote.votes;
            this.dateCreated = quote.dateCreated;
            this.dateQuote = quote.dateQuote;
            this.source = quote.source;
            this.partyId = quote.partyId;
            this.userId = quote.userId;
            this.politicianId = quote.politicianId;
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