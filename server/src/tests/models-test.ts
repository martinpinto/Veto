import Quote from "../models/Quote";

const util = require('util')
import { expect } from 'chai';
import { reporters } from 'mocha';

describe('Model Dynamic Parser', function() {  
    it('should return a model', () => {
        let instantiate = function instantiate(className: string) {
            var tmpObj = {};
            tmpObj[className] = {};
            var obj = Object.create(tmpObj[className]);
            return obj;
          };

        let model = new Quote();
        model['Quotes.id'] = 1;
        model['Quotes.dateQuote'] = new Date();
        model['Politician.id'] = 2;
        model['Politician.firstname'] = "Udo";

        let model2 = new Quote();
        for (let key in model) {
            if (model.hasOwnProperty(key)) {
                let split = key.split(".");
                if (split.length > 1) {
                    let properties = {
                        model: split[0],
                        property: split[1]
                    };
                    if (properties.model == model._type) {
                        model2[properties.property] = model[key];
                    } else {
                        if (!model2[properties.model]) {
                            model2[properties.model] = instantiate(properties.model);
                        }
                        model2[properties.model][properties.property] = model[key];
                    }
                }
            }
        }
        console.log(model2); 
    });
});
