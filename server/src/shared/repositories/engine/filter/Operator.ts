export const enum OperatorEnum {
    $NONE,
    $OR,
    $AND,
    $EQ,
    $NEQ,
    $LT,
    $LTE,
    $GT,
    $GTE,
    $IN,
    $NIN,
    $EXISTS,
    $REGEX
};

export class Operator {
    private type: OperatorEnum;
    private field: Operator|string|boolean|number|Date;
    private value: Operator|string|boolean|number|Date;

    constructor(field, value, type: OperatorEnum) {
        this.field = field;
        this.value = value;
        this.type = type;
    }

    getType(): OperatorEnum {
        return this.type;
    }

    getField(): Operator|string|boolean|number|Date {
        return this.field;
    }

    getValue(): Operator|string|boolean|number|Date {
        return this.value;
    }
}