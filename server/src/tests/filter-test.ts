import { Operator, OperatorEnum } from "../databases/engine/filter/Operator";
import { MongoDbWhereFilter } from "../databases/mongodb/MongoDbWhereFilter";

const util = require('util')
import { expect } from 'chai';
import { reporters } from 'mocha';

describe('Where Filter', function() {  
    it('should return a list of operators', () => {
        let eq = new Operator("id", 2, OperatorEnum.$EQ);
        let neq = new Operator("name", "test", OperatorEnum.$NEQ);
        let and1 = new Operator(eq, neq, OperatorEnum.$AND);
        
        let filter1 = new MongoDbWhereFilter(and1);
        console.log(util.inspect(filter1, false, null))
        expect(filter1).to.exist
    });
});
