import { IWhereFilter, WhereFilter } from "../engine/filter/WhereFilter";
import { Operator, OperatorEnum } from "../engine/filter/Operator";

export class MongoDbWhereFilter extends WhereFilter implements IWhereFilter {
    public operators: Operator[];
    
    constructor(...operators: Operator[]) {
        super();
        this.operators = operators;        
    }
    
    $OR(leftOperand: any, rightOperand: any): any {
        return { $AND: [leftOperand, rightOperand] };
    }

    $EQ(field: any, value: any): any {
        return { $EQ: { field: value }};
    }
    
    $NEQ(field: any, value: any): any {
        return { $NEQ: { field: value }};
    }
    
    $AND(leftOperand: any, rightOperand: any): any {
        return { $AND: [leftOperand, rightOperand] };
    }
    
    $LT(field: any, value: any): any {
        return { $LT: { field: value }};
    }
    
    $LTE(field: any, value: any): any {
        return { $LTE: { field: value }};
    }
    
    $GT(field: any, value: any): any {
        return { $GT: { field: value }};
    }

    $GTE(field: any, value: any): any {
        return { $GTE: { field: value }};
    }

    $IN(field: any, value: any): any {
        return { $IN: { field: value }};
    }

    $NIN(field: any, value: any): any {
        return { $NIN: { field: value }};
    }

    $EXISTS(field: any, value: any): any {
        return { $EXISTS: { field: value }};
    }
    
    $REGEX(field: any, value: any): any {
        return { $REGEX: { field: value }};
    }
}