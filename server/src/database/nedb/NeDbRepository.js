import ModelService from '../ModelService';
import Model from '../../models/Model';

var DataStore = require('NeDb');

/**
 * This class is a simple implementation of the NeDB data storage.
 * @see https://github.com/louischatriot/nedb
 * 
 * The use of operators for querying data is encouraged.
 * The following operators are defined by NeDB and are widely used:
 * Operators ($lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex)
 * The syntax is { field: { $op: value } } where $op is any comparison operator:
 *
 * $lt, $lte: less than, less than or equal
 * $gt, $gte: greater than, greater than or equal
 * $in: member of. value must be an array of values
 * $ne, $nin: not equal, not a member of
 * $exists: checks whether the document posses the property field. value should be true or false
 * $regex: checks whether a string is matched by the regular expression. Contrary to MongoDB, the use of $options with $regex is not supported, because it doesn't give you more power than regex flags. Basic queries are more readable so only use the $regex operator when you need to use another operator with it.
 */
export default class ModelRepository {

    constructor() {
        this.db = new DataStore({ filename: './build/database/nedb/storage.db', autoload: true });
    }

    /**
     * Return the number of records that match the optional "where" filter.
     * 
     * @param: [where]	Object	
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     * @param: callback	Function	
     *   Callback function called with (err, count) arguments. Required.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    count	Number	
     *     Number of instances updated.
     */
    count(where, callback) {
        let filter;
        if (typeof where !== 'undefined') {
            filter = {}; // count all
        } else {
            filter = where;
        }
        this.db.count(filter, (err, count) => {
            callback(err, count);
        });
    };
    
    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: {Object}|[{Object}]		
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     * @param: callback	Function	
     *   Callback function called with cb(err, obj) signature.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    newModel	Object	
     *     Model instance or null.
     */
    create(model, callback) {
        if (typeof model !== 'undefined') {
            this.db.insert(model, (err, newModel) => {
                callback(err, newModel);
            });
        } else {
            let err = new Error('Please provide a valid model!');
            callback(err, null);            
        }
    };
    
    /**
     * Destroy all model instances that match the optional where specification.
     * 
     * @param: [where]	Object	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     * @param: callback	Function	
     *   Optional callback function called with (err, info) arguments.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    info	Number	
     *     Number of instances (rows, documents) destroyed.
     */
    destroyAll(where, callback) {
        if (typeof where !== 'undefined' && where !== {}) {
            db.remove(where, { multi: true}, (err, numRemoved) => {
                callback(err, numRemoved);
            });
        }
        let err = new Error('Removing all documents not supported!');
        callback(err, null);
    };
    
    /**
     * Destroy model instance with the specified ID.
     * 
     * @param: id		
     *   The ID value of model instance to delete.
     * @param: callback	Function	
     *   Callback function called with (err) arguments. Required.
     *   Callback returns:
     *   err	Error	
     *    Error object; see Error object.
     */
    destroyById(id, callback) {
        if (typeof id !== 'undefined') {
            db.remove({ _id: id }, {}, (err, numRemoved) => {
                callback(err, numRemoved);
            });
        }
        let err = new Error('Please provide an id!');
        callback(err, null);
    };
    
    /**
     * Check whether a model instance exists in database.
     * 
     * @param: id	id	
     *   Identifier of object (primary key value).
     * @param: callback	Function	
     *   Callback function called with (err, exists) arguments. Required.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    exists	Boolean	
     *     True if the instance with the specified ID exists; false otherwise.
     */
    exists(id, callback) {};
    
    /**
     * Find all model instances that match filter specification.
     * 
     * @param: [filter]	Object	
     *   Optional Filter JSON object; see below.
     * @param: callback	Function	
     *   Callback function called with (err, returned-instances) arguments. Required.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    models	Array	
     *     Model instances matching the filter, or null if none found.
     */
    find(filter, callback) {
        let where;
        if (typeof filter == 'undefined' || filter === {}) {
            where = {}; // find all
        } else if (filter instanceof Model) {
            where = { _type: Object.getPrototypeOf(filter) };
        } else {
            where = filter;
        } 
        this.db.find(where, (err, models) => {
            callback(err, models);
        });
    };
    
    /**
     * Find object by ID with an optional filter for include/fields.
     * 
     * @param: id		
     *   Primary key value
     * @param: [filter]	Object	
     *   Optional Filter JSON object; see below.
     * @param: callback	Function	
     *   Callback function called with (err, instance) arguments. Required.
     *   Callback returns:
     *    err	Error	
     *     Error object; see Error object.
     *    instance	Object	
     *     Model instance matching the specified ID or null if no instance matches.
     */
    findById(id, filter, callback) {
        if (typeof id !== 'undefined') {
            let merge = { _id: id };
            if (typeof filter !== 'undefined') {
                // merge the two objects and pass them to db
                for (var key in filter) {
                    if (filter.hasOwnProperty(key)) {
                        merge[key] = filter[key];
                    }
                }
            }
            this.db.findOne(merge, (err, model) => {
                callback(err, model);
            });
        } else {
            let err = new Error('Please provide an id!');
            callback(err, null);
       }
    };
    
    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] Object
     *   Optional where filter, like {}
     * @param: callback Function
     *   Callback function called with (err, info) arguments. Required.
     *   Callback returns: 
     *    err	Error	
     *     Error object; see Error object.
     *    info	Number	
     *     Number of instances (rows, documents) updated.
     */
    updateById(id, where, callback) {};

    /**
     * Update multiple instances that match the where clause.
     * 
     * @param: [where]	Object 
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     *   see Where filter.
     * @param: data	Object	
     *   Object containing data to replace matching instances, if any.
     * @param: callback	Function	
     *   Callback function called with (err, info) arguments. Required.
     *   Callback returns: 
     *    err	Error	
     *     Error object; see Error object.
     *    info	Number	
     *     Number of instances (rows, documents) updated.
     */
    updateAll(where, data, callback) {
        db.update({}, {}, { multi: true }, (err, numReplaced) => {

        });
    };

} 
