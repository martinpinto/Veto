import { IWhereFilter } from "../engine/filter/WhereFilter";
import { Operator, OperatorEnum } from "../engine/filter/Operator";

export default class MySqlWhereFilter implements IWhereFilter {
    public operators: Operator[];
    
    constructor(...operator: Operator[]) {
        this.operators = operator;
    }

    public resolve(): any {
        
    }

    $OR(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $AND(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $EQ(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $NEQ(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $LT(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $LTE(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $GT(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $GTE(field: any, value: any) {
        throw new Error("Method not implemented.");
    }
    $IN(field: any, value: any) {
        throw new Error("Method not implemented.");
    }

    $NIN(field: any, value: any) {
        throw new Error("Method not implemented.");
    }
    $EXISTS(field: any, value: any) {
        throw new Error("Method not implemented.");
    }
    
    $REGEX(field: any, value: any) {
        throw new Error("Method not implemented.");
    }
}