import config from "../../config/config";
import IModelRepository from "../engine/IModelRepository";
import WhereFilter from "../engine/filter/WhereFilter";

export default class ModelRepository implements IModelRepository {
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
     * @param: [where] WhereFilter
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...}
     * @param: modelName string
     *   The database table/record to be queried.
     */
    count(where: WhereFilter, modelName: string) {

    };

    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: {Object}|[{Object}]		
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
     * @param: [where]	WhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyAll(where: WhereFilter, modelName) {
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
     * @param: [where]	WhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    destroyById(id, where: WhereFilter, modelName: string) {
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
     * @param: [where] WhereFilter
     *     Model instances matching the filter, or null if none found.
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    find(where: WhereFilter, modelName: string) {
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
     * @param: [where]	WhereFilter	
     *   Optional Filter JSON object
     */
    findById(id, where: WhereFilter) {

    };

    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] WhereFilter
     *   Optional where filter, like {}
     */
    updateById(id, where: WhereFilter) {

    };

    /**
     * Update multiple instances that match the where clause.
     * 
     * @param: [where]	WhereFilter 
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     *   see Where filter.
     * @param: data	Object	
     *   Object containing data to replace matching instances, if any.
     */
    updateAll(where: WhereFilter, data) {

    };

}
