import IModelRepository from '../engine/IModelRepository';
import Model from '../entities/model.entity';
import { IWhereFilter } from "../engine/filter/WhereFilter";

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
export default class ModelRepository implements IModelRepository {
    private db;

    constructor() {
        this.db = new DataStore({ filename: './build/database/nedb/storage.db', autoload: true });
    }

    /**
     * Return the number of records that match the optional "where" filter.
     *
     * @param: modelName string
     *   The database table/record to be queried.
     * @param: [where] IWhereFilter
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...}
     */
    count(modelName: string, where?: IWhereFilter) {
        let filter;
        if (typeof where !== 'undefined') {
            filter = {}; // count all
        } else {
            filter = where;
        }
        this.db.count(filter, (err, count) => {
            // TODO: turn this into promise
            //callback(err, count);
        });
    };
    
    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: model Object		
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     */
    create(model) {
        if (typeof model !== 'undefined') {
            this.db.insert(model, (err, newModel) => {
                // TODO: turn this into promise
                //callback(err, newModel);
            });
        } else {
            let err = new Error('Please provide a valid model!');
            // TODO: turn this into promise
            //callback(err, null);            
        }
    };
    
    /**
     * Destroy all model instances that match the optional where specification.
     * 
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] IWhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyAll(modelName: string, where?: IWhereFilter) {
        // if (typeof where !== 'undefined' && where !== {}) {
        //     this.db.remove(where, { multi: true}, (err, numRemoved) => {
        //         // TODO: turn this into promise
        //         //callback(err, numRemoved);
        //     });
        // }
        let err = new Error('Removing all documents not supported!');
        // TODO: turn this into promise
        //callback(err, null);
    };
    
    /**
     * Destroy model instance with the specified ID.
     * 
     * @param: id
     *   The ID value of model instance to delete.
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] IWhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyById(id, modelName: string, where?: IWhereFilter) {
        if (typeof id !== 'undefined') {
            this.db.remove({ _id: id }, {}, (err, numRemoved) => {
                // TODO: turn this into promise
                //callback(err, numRemoved);
            });
        }
        let err = new Error('Please provide an id!');
        // TODO: turn this into promise
        //callback(err, null);
    };
    
    /**
     * Check whether a model instance exists in database.
     * 
     * @param: id	
     *   Identifier of object (primary key value).
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    exists(id, modelName: string) {};
    
    /**
     * Find all model instances that match filter specification.
     *
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] IWhereFilter
     *     Model instances matching the filter, or null if none found.
     */
    find(modelName: string, where?: IWhereFilter) {
        let filter;
        // if (typeof where == 'undefined' || where === {}) {
        //     filter = {}; // find all
        // } else {
        //     filter = where;
        // } 
        this.db.find(filter, (err, models) => {
            // TODO: turn this into promise
            //callback(err, models);
        });
    };
    
    /**
     * Find object by ID with an optional filter for include/fields.
     * 
     * @param: id		
     *   Primary key value
     * @param: [where] IWhereFilter	
     *   Optional Filter JSON object
     */
    findById(id, where?: IWhereFilter) {
        if (typeof id !== 'undefined') {
            let merge = { _id: id };
            if (typeof where !== 'undefined') {
                // merge the two objects and pass them to db
                for (var key in where) {
                    if (where.hasOwnProperty(key)) {
                        merge[key] = where[key];
                    }
                }
            }
            this.db.findOne(merge, (err, model) => {
                // TODO: turn this into promise
                //callback(err, model);
            });
        } else {
            let err = new Error('Please provide an id!');
            // TODO: turn this into promise
            //callback(err, null);
       }
    };
    
    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] IWhereFilter
     *   Optional where filter, like {}
     */
    updateById(id, where?: IWhereFilter) {};

    /**
     * Update multiple instances that match the where clause.
     * 
     * @param: models Object	
     *   Object containing data to replace matching instances, if any.
     * @param: [where] IWhereFilter 
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     *   see Where filter.
     */
    updateAll(models, where?: IWhereFilter) {
        this.db.update({}, {}, { multi: true }, (err, numReplaced) => {

        });
    };

} 
