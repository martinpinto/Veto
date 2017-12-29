import config from "../../config/config";
import IModelRepository, { IModelAttributes } from "../engine/IModelRepository";
import Model from "../../models/Model";
import { IWhereFilter } from "../engine/filter/WhereFilter";
import MySqlWhereFilter from "./MySqlWhereFilter";

var mysql = require('promise-mysql');

export default class MySqlRepository implements IModelRepository {

    constructor() {
    }

    private createConnection() {
        return mysql.createConnection({
            host     : config.database.mysql.baseurl,
            user     : config.database.mysql.user,
            password : config.database.mysql.password,
            database : config.database.mysql.database
        });
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
        return this.createConnection().then(connection => {
            return connection.query(`SELECT COUNT * FROM ${modelName}`).then(rows => {
                return rows;
            });
        });
    };

    /**
     * Create new instance of Model, and save to database.
     * 
     * @param: model Object		
     *   data Optional data argument. Can be either a single model instance or an array of instances.
     * @param: modelName string
     *   the name of the table/record to be deleted.
     */
    create(model: Model, modelName: string) {
        this.createConnection().then(connection => {
            let mappedProperties: IModelAttributes = this.getAllAttributes(model);
            let properties: string[] = [];
            let values: string[] = [];
            for (let i = 0; i < mappedProperties.properties.length - 1; i++) {
                properties[i] = `${mappedProperties.properties[i]}, `;
            }
            // add last property
            properties[mappedProperties.properties.length - 1] = mappedProperties.properties[mappedProperties.properties.length - 1];
            
            for (let i = 0; i < mappedProperties.values.length - 1; i++) {
                values[i] = `${mappedProperties.values[i]}, `;
            }
            // add last value
            values[mappedProperties.values.length - 1] = mappedProperties.values[mappedProperties.values.length - 1];
            
            let query: string = `INSERT INTO ${modelName} (${properties.join("")}) VALUES(${values.join("")})`;
            connection.query(query);
        })
        
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
        let database = null;
       
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
        let database = null;
        
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
     * @param: [where] IWhereFilter
     *     Model instances matching the filter, or null if none found.
     */
    find(modelName: string, where?: IWhereFilter) {
        return this.createConnection().then(connection => {
            return connection.query('SELECT * FROM ' + modelName + 's AS QUOTES').then(rows => {
                return rows;
            });
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

    };

    /**
     * Update single model instance that match the where clause.
     * 
     * @param: id 
     *   Primary key value
     * @param: [where] IWhereFilter
     *   Optional where filter, like {}
     */
    updateById(id, where?: IWhereFilter) {

    };

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

    };

    getAllAttributes(model: Model): IModelAttributes {
        let attributes: IModelAttributes = {
            properties: [],
            values: []
        };
        for (let name in model) {
            if (model.hasOwnProperty(name) && typeof model[name] !== 'function') {
                attributes.properties.push(name);
                attributes.values.push(model[name]);
            }
        }
        return attributes;
    }
}
