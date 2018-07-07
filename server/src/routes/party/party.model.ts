import Model from '../../shared/entities/model.entity';

export default class Party extends Model {
    public id: number;

    public name: string;
    public logo: string;
    public link: string;

    constructor(party?: Party) {
        super();

        if (party) {
            this.id = party.id || -1;
            this.name = party.name || "";
            this.logo = party.logo || "";
            this.link = party.link || "";
        }
    }
}