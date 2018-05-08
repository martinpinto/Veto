import Model from './Model';
import Topic from './Topic';
import User from './User';
import Politician from './Politician';
import Party from './Party';
import QuoteEntity from './QuoteEntity';

export default class Quote extends Model {
    public id: number;

    public title: string;
    public description: string;
    public status: string;
    public votes: number;
    public dateCreated: string; // should be date YYYY-MM-dd for mysql
    public dateQuote: string; // should be date YYYY-MM-dd for mysql
    public source: string;
    public partyId: number;
    public party?: Party;
    public userId: number;
    public user?: User;
    public politicianId: number;
    public politician?: Politician;
    public topic?: Topic;
    
    constructor(quote?: Quote | QuoteEntity) {
        super();
        this._type = "Quotes";

        if (quote && quote instanceof Quote) {
            this.id = quote.id  || -1;
            this.title = quote.title || "";
            this.description = quogit te.description || "";
            this.status = quote.status || "";
            this.votes = quote.votes || 0;
            this.dateCreated = quote.dateCreated || "";
            this.dateQuote = quote.dateQuote || "";
            this.source = quote.source || "";
            this.partyId = quote.partyId || -1;
            this.userId = quote.userId || -1;
            this.politicianId = quote.politicianId || -1;

            super.parseDynamicValues(quote);
        }
    }
}

/* Sample JSON:
    "votes": {
      "up_vote_count": {},
      "down_vote_count": {}
    }
*/