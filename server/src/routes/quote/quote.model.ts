import Model from '../../shared/repositories/entities/model.entity';
import Topic from '../topic/topic.model';
import User from '../user/user.model';
import Politician from '../politician/politician.model';
import Party from '../party/party.model';
import QuoteEntity from '../../shared/repositories/entities/quote.entity';

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
    public topics?: Topic[];
    
    constructor(quote?: Quote | QuoteEntity) {
        super();

        if (quote) {
            if (quote instanceof Quote) {
                this.id = quote.id || -1;
                this.title = quote.title || "";
                this.description = quote.description || "";
                this.status = quote.status || "";
                this.votes = quote.votes || 0;
                this.dateCreated = quote.dateCreated || "";
                this.dateQuote = quote.dateQuote || "";
                this.source = quote.source || "";
                this.partyId = quote.partyId || -1;
                this.userId = quote.userId || -1;
                this.politicianId = quote.politicianId || -1;
    
                super.parseDynamicValues(quote);
            } else if (quote instanceof QuoteEntity) {
                this.id = quote.q_id || -1;
                this.title = quote.q_title || "";
                this.description = quote.q_description || "";
                this.status = quote.q_status || "";
                this.votes = quote.q_votes || 0;
                this.dateCreated = quote.q_dateCreated || "";
                this.dateQuote = quote.q_dateQuote || "";
                this.source = quote.q_source || "";
                this.partyId = quote.q_partyId || -1;
                this.userId = quote.q_userId || -1;
                this.politicianId = quote.q_politicianId || -1;
                
                this.party = new Party();
                this.party.id = quote.py_id || -1;
                this.party.name = quote.py_name || "";
                this.party.link = quote.py_link || "";
                this.party.logo = quote.py_logo || "";

                this.user = new User();
                this.user.id = quote.u_id || -1;
                this.user.firstname = quote.u_firstname || "";
                this.user.lastname = quote.u_lastname || "";
                this.user.username = quote.u_firstname || "";
                this.user.email = quote.u_email || "";
                this.user.avatar = quote.u_avatar || "";

                this.politician = new Politician();
                this.politician.id = quote.p_id || -1;
                this.politician.firstname = quote.p_firstname || "";
                this.politician.lastname = quote.p_lastname || "";
                this.politician.party = this.party || null; // todo is this right?
                this.politician.partyId = quote.p_partyId || -1
                this.politician.role = quote.p_role || "";
                this.politician.votes = quote.p_votes || -1
                this.politician.avatar = quote.p_avatar || "";

                this.topics = [];
                if (quote.topics) {
                    this.topics = quote.topics;
                }
            }
        }
    }
}

/* Sample JSON:
    "votes": {
      "up_vote_count": {},
      "down_vote_count": {}
    }
*/