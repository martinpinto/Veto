import config from "../../config/config";
import IModelRepository from "../engine/IModelRepository";
import { IWhereFilter } from "../engine/filter/WhereFilter";
import { MongoDbWhereFilter } from "./MongoDbWhereFilter";

export default class MongoDbRepository implements IModelRepository {
    private db;

    constructor() {
        //super(null);
        
        var Promise = require('bluebird');
        var MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);

        this.db = {
            open: () => {
                // Connection URL
                let url = config.getFullUrl();
                return new Promise((resolve, reject) => {
                    // Use connect method to connect to the Server
                    MongoClient.connect(url, (err, db) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(db);
                        }
                    });
                });
            },
            close: (db) => {
                //Close connection
                if(db){
                    db.close();
                }
            }
        }
    }

    /**
     * Return the number of records that match the optional "where" filter.
     *
     * @param: modelName string
     *   The database table/record to be queried.
     * @param: [where] WhereFilter
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...}
     */
    count(modelName: string, where?: IWhereFilter) {

    };

    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: model Object		
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     */
    create(model) {
        let database = null;
        this.db.open()
        .then((db) => {
            database = db;
            return db.collection(model._name);
        })
        .then((modelsCollection) => {
            return modelsCollection.insert(model);
        })
        .then((result) => {
            console.log(result);
            database.close();
        })
        .catch((err) => {
            console.error(err);
        });
    };

    /**
     * Destroy all model instances that match the optional where specification.
     * 
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] WhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyAll(modelName: string, where?: IWhereFilter) {
        let database = null;
        this.db.open()
        .then((db) => {
            database = db;
            return db.collection(modelName);
        })
        .then((modelsCollection) => {
            return modelsCollection.deleteMany(where, null);
        })
        .then((result) => {
            console.log(result);
            database.close();
        })
        .catch((err) => {
            console.error(err);
        });
    };

    /**
     * Destroy model instance with the specified ID.
     * 
     * @param: id
     *   The ID value of model instance to delete.
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] WhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyById(id, modelName: string, where?: IWhereFilter) {
        let database = null;
        this.db.open()
        .then((db) => {
            database = db;
            return db.collection(modelName);
        })
        .then((modelsCollection) => {
            return modelsCollection.deleteOne(where);
        })
        .then((result) => {
            console.log(result);
            database.close();
        })
        .catch((err) => {
            console.error(err);
        });
    };

    /**
     * Check whether a model instance exists in database.
     * 
     * @param: id	
     *   Identifier of object (primary key value).
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    exists(id, modelName: string) {

    };

    /**
     * Find all model instances that match filter specification.
     *
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] WhereFilter
     *     Model instances matching the filter, or null if none found.
     */
    find(modelName: string, where?: IWhereFilter) {
        let database = null;

        return this.db.open()
            .then((db) => {
                database = db;
                return db.collection(modelName);
            })
            .then((modelsCollection) => {
                return new Promise((resolve, reject) => {
                    modelsCollection.find(where).toArray((err, docs) => {
                        if (err) {
                            reject(err);
                        }
                        if (docs) {
                            console.log("db");
                            console.log(docs);
                            resolve(docs);
                        }
                        database.close();
                    });
                });
            })
            .catch((err) => {
                console.error(err);
            })
    };

    /**
     * Find object by ID with an optional filter for include/fields.
     * 
     * @param: id		
     *   Primary key value
     * @param: [where] WhereFilter	
     *   Optional Filter JSON object
     */
    findById(id, where?: IWhereFilter) {

    };

    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] WhereFilter
     *   Optional where filter, like {}
     */
    updateById(id, where?: IWhereFilter) {

    };

    /**
     * Update multiple instances that match the where clause.
     * 
     * @param: models Object	
     *   Object containing data to replace matching instances, if any.
     * @param: [where] WhereFilter 
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     *   see Where filter.
     */
    updateAll(models, where?: IWhereFilter) {

    };

}
