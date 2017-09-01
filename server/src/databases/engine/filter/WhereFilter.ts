import { Operator } from "./Operator";

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
export default class WhereFilter {
    public Operator: Operator;

    constructor(operator: Operator) {
        this.Operator = operator;
    }
}