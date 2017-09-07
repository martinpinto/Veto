import { Operator, OperatorEnum } from "./Operator";

/**
 * The following operators are defined:
 * Operators ($lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex)
 * The syntax is { field: { $op: value } } where $op is any comparison operator:
 *
 * $lt, $lte: less than, less than or equal
 * $gt, $gte: greater than, greater than or equal
 * $in: member of value must be an array of values
 * $ne, $nin: not equal, not a member of
 * $exists: checks whether the document posses the property field. value should be true or false
 * $regex: checks whether a string is matched by the regular expression. Contrary to MongoDB, the use of $options with $regex is not supported, because it doesn't give you more power than regex flags. Basic queries are more readable so only use the $regex operator when you need to use another operator with it.
*/
export interface IWhereFilter {
    $OR(leftOperand, rightOperand): any;
    $AND(leftOperand, rightOperand): any;
    $EQ(field, value): any;
    $NEQ(field, value): any;
    $LT(field, value): any;
    $LTE(field, value): any;
    $GT(field, value): any;
    $GTE(field, value): any;
    $IN(field, value): any;
    $NIN(field, value): any;
    $EXISTS(field, value): any;
    $REGEX(field, value): any;
}

export class WhereFilter implements IWhereFilter {
    public operators: Operator[];
    
    constructor(...operators: Operator[]) {
        this.operators = operators;
    }

    public resolve(currentOperator) {
        if (currentOperator.getType() == OperatorEnum.$EQ) {
            return this.$EQ(
                currentOperator.getField(),
                currentOperator.getValue()
            );
        }

        if (currentOperator.getType() == OperatorEnum.$NEQ) {
            return this.$NEQ(
                currentOperator.getField(),
                currentOperator.getValue()
            );
        }

        if (currentOperator.getType() == OperatorEnum.$AND) {
            return this.$AND(
                this.resolve(currentOperator.getField()), 
                this.resolve(currentOperator.getValue())
            );
        }
    }

    $EQ(field: any, value: any): any {
        return { $EQ: { field: value }};
    }

    $NEQ(field: any, value: any): any {
        return { $NEQ: { field: value }};
    }

    $GT(field: any, value: any): any {
        return { $GT: { field: value }};
    }

    $AND(leftOperand: any, rightOperand: any): any {
        return { $AND: [leftOperand, rightOperand] };
    }

    $OR(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }
    

    $LT(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }

    $LTE(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }

    $GTE(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }
    $IN(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }

    $NIN(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }
    $EXISTS(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }
    
    $REGEX(field: any, value: any): any {
        throw new Error("Method not implemented.");
    }
}