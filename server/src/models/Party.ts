import Model from './Model';

export default class Party extends Model {
    public id: number;

    public name: string;
    public logo: string;
    public link: string;

    constructor(party?: Party) {
        super();
        this._type = "Parties"

        if (party) {
            this.name = party.name;
            this.logo = party.logo;
            this.link = party.link;
        }
    }
}