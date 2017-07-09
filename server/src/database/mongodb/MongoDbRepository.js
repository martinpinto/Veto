import config from "../../config/config";

export default class ModelRepository {

    constructor() {
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

    };

    /**
     * Create new instance of Model, and save to database.
     *
     * @param: {Object}|[{Object}]
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     * @param: obj
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
    destroyAll(where, model) {
        let database = null;
        this.db.open()
        .then((db) => {
            database = db;
            return db.collection(model._name);
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
     * @param: callback	Function
     *   Callback function called with (err) arguments. Required.
     *   Callback returns:
     *   err	Error
     *    Error object; see Error object.
     */
    destroyById(id, callback) {
        let database = null;
        this.db.open()
        .then((db) => {
            database = db;
            return db.collection(model._name);
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
    exists(id, callback) {

    };

    /**
     * Find all model instances that match filter specification.
     *
     * @param: model	Object
     *   Optional Filter JSON object;
     * @param: filter	Object
     *     Model instances matching the filter, or null if none found.
     */
    find(model, filter) {
        let database = null;

        return this.db.open()
            .then((db) => {
                database = db;
                return db.collection(model._name);
            })
            .then((modelsCollection) => {
                return new Promise((resolve, reject) => {
                    modelsCollection.find(filter).toArray((err, docs) => {
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
    updateById(id, where, callback) {

    };

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

    };

}
