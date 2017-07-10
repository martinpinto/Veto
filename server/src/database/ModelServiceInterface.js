export default class ModelService {

    constructor(repository) {
        this.repository = repository;
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
        if (typeof this.repository !== 'undefined') {
            this.repository.count(where, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
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
     *    models	Object	
     *     Model instances or null.
     */
    create(model, callback) {
        if (typeof this.repository !== 'undefined') {
            this.repository.create(model, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
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
     *    info	Object	
     *     Additional information about the command outcome.
     *    info.count	Number	
     *     Number of instances (rows, documents) destroyed.
     */
    destroyAll(where, callback) {
        if (typeof this.repository !== 'undefined') {        
            this.repository.destroyAll(where, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
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
        if (typeof this.repository !== 'undefined') {
            this.repository.destroyById(id, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
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
        if (typeof this.repository !== 'undefined') {
            this.repository.exists(id, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
    };
    
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
        if (typeof this.repository !== 'undefined') {
           this.repository.find(filter, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
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
        if (typeof this.repository !== 'undefined') {
            this.repository.findById(id, filter, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
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
     *    info	Object	
     *     Additional information about the command outcome.
     *    info.count	Number	
     *     Number of instances (rows, documents) updated.
     */
    updateById(id, where, callback) {
        if (typeof this.repository !== 'undefined') {
            this.repository.updateById(id, where, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
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
     *    info	Object	
     *     Additional information about the command outcome.
     *    info.count	Number	
     *     Number of instances (rows, documents) updated.
     */
    updateAll(where, data, callback) {
        if (typeof this.repository !== 'undefined') {
            this.repository.updateAll(where, data, callback);
        } else {
            throw {
                name : "NotImplementedError", 
                message : "Method needs to be implemented."
            }; 
        }
    };

} 
