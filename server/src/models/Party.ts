import Model from './Model';

export default class Party extends Model {
    public id: number;

    public name: string;
    public logo: string;
    public link: string;

    constructor(party?: Party) {
        super();
        this._type = "Party"

        if (party) {
            this.id = party.id || -1;
            this.name = party.name || "";
            this.logo = party.logo || "";
            this.link = party.link || "";
        }
    }
}