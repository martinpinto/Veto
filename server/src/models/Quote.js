import Model from './Model';

export class Quote extends Model {
    constructor(quote) {
        super();
        console.log(quote);
        this._name = "Quote";
        if (typeof quote !== undefined) {
            this.name = quote.name;
            this.author = quote.author;
        }
    }
}