import { Operator, OperatorEnum } from "../databases/engine/filter/Operator";
import { Query } from "../databases/engine/filter/Query";
import { WhereFilter, IWhereFilter } from "../databases/engine/filter/WhereFilter";

import * as chai from 'chai';

describe('Where Filter', function() {  
    it('should return a list of operators', () => {
        let eq = new Operator("id", 2, OperatorEnum.$EQ);
        let neq = new Operator("name", "test", OperatorEnum.$NEQ);
        let and1 = new Operator(eq, neq, OperatorEnum.$AND);
        
        let filter1 = new WhereFilter(and1);
        console.log(filter1);
        chai.expect(filter1).to.exist
    });
});
