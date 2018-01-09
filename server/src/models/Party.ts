import Model from './Model';

export default class Party implements Model {
    public id: number;
    public _type: string;

    public name: string;
    public logo: string;
    public link: string;

    constructor(party?: Party) {
        this._type = "Parties"

        if (party) {
            this.name = party.name;
            this.logo = party.logo;
            this.link = party.link;
        }
    }
}