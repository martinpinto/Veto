import { Operator, OperatorEnum } from "./databases/engine/filter/Operator";
import { Query } from "./databases/engine/filter/Query";
import { WhereFilter, IWhereFilter } from "./databases/engine/filter/WhereFilter";


export function test() {
    let eq: Operator = new Operator("id", 2, OperatorEnum.$EQ);
    let neq: Operator = new Operator("name", "test", OperatorEnum.$NEQ);
    let and1 = new Operator(eq, neq, OperatorEnum.$AND);
    
    let filter1 = new WhereFilter(and1);
    console.log(filter1);
}

//let neq2: Operator = new Operator("dateCreated", new Date(), OperatorEnum.$NEQ);
//let andAll: Operator = new Operator(neq2, and1, OperatorEnum.$AND); 

// let operators: Operator = new Operator({ 
//      $AND: 
//      [ 
//          { $EQ: { id: 2 } }, 
//          { $NEQ: { name: "Test" } } 
//      ]
//  });

//let filter1 = new WhereFilter(and1);
//let filter2 = new WhereFilter(andAll);