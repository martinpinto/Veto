import { IWhereFilter } from "./filter/WhereFilter";

export default interface IModelRepository {

    /**
     * Return the number of records that match the optional "where" filter.
     *
     * @param: modelName string
     *   The database table/record to be queried.
     * @param: [where] IWhereFilter
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...}
     */
    count(modelName: string, where?: IWhereFilter);
    
    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: model Object		
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     */
    create(model);
    
    /**
     * Destroy all model instances that match the optional where specification.
     * 
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] IWhereFilter	
     *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
     */
    destroyAll(modelName: string, where?: IWhereFilter);
    
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
    destroyById(id, modelName: string, where?: IWhereFilter);
    
    /**
     * Check whether a model instance exists in database.
     * 
     * @param: id	
     *   Identifier of object (primary key value).
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    exists(id, modelName: string);
    
    /**
     * Find all model instances that match filter specification.
     *
     * @param: modelName string
     *   the name of the table/record to be deleted.
     * @param: [where] IWhereFilter
     *     Model instances matching the filter, or null if none found.
     */
    find(modelName: string, where?: IWhereFilter);
    
    /**
     * Find object by ID with an optional filter for include/fields.
     * 
     * @param: id		
     *   Primary key value
     * @param: [where] IWhereFilter	
     *   Optional Filter JSON object
     */
    findById(id, where?: IWhereFilter);
    
    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] IWhereFilter
     *   Optional where filter, like {}
     */
    updateById(id, where?: IWhereFilter);

    /**
     * Update multiple instances that match the where clause.
     * 
     * @param: models Object	
     *   Object containing data to replace matching instances, if any.
     * @param: [where] IWhereFilter 
     *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
     *   see Where filter.
     */
    updateAll(models, where?: IWhereFilter);

} 
