import config from "../../config/config";
import IModelRepository, { IModelAttributes } from "../engine/IModelRepository";
import Model from "../../models/Model";
import { IWhereFilter } from "../engine/filter/WhereFilter";
import MySqlWhereFilter from "./MySqlWhereFilter";
import { logger } from '../../services/LoggerService';

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
                connection.end();
                return rows[0];
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
    create(model: Model, modelName: string): Promise<string> {
        return this.createConnection().then(connection => {
            let mappedProperties: IModelAttributes = this.getAllAttributes(model);
            let properties: string[] = [];
            let values: string[] = [];
            for (let i = 0; i < mappedProperties.properties.length - 1; i++) {
                properties[i] = `${mappedProperties.properties[i]}, `;
            }
            // add last property
            properties[mappedProperties.properties.length - 1] = mappedProperties.properties[mappedProperties.properties.length - 1];
            
            for (let i = 0; i < mappedProperties.values.length - 1; i++) {
                let value = mappedProperties.values[i];
                if (typeof value !== 'number') {
                    value = `'${value}'`;
                }
                values[i] = `${value}, `;
            }
            // add last value
            let lastValue = mappedProperties.values[mappedProperties.values.length - 1];
            if (typeof lastValue !== 'number') {
                lastValue = `'${lastValue}'`;
            }
            values[mappedProperties.values.length - 1] = lastValue;
            
            let query: string = `INSERT INTO ${modelName} (${properties.join("")}) VALUES (${values.join("")})`;

            return connection.query(query).then(result => {
                connection.end();   
                return result;         
            });
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
     *   the name of the table/record to be fetched.
     * @param: [where] IWhereFilter | string
     *     Model instances matching the filter, or null if none found.
     * @param: [join] string
     *   joins the table/record with another table/record.
     * @param: [sort] string
     *   sorts the table/table according to a specific criteria.
     */
    find(modelName: string | string[], fields?: string, where?: IWhereFilter | string, join?: string, sort?: string) {
        return this.createConnection().then(connection => {
            let whereFilter = where ? ` WHERE ${where}` : "";
            let joinFilter = join ? join : "";
            let sortFilter = sort ? sort : "";
            let fieldsFilter = fields ? fields : "*";
            let modelFilter = modelName instanceof Array ? modelName.join(", ") : modelName;
            let query: string = `SELECT ${fieldsFilter} FROM ${modelName} ${whereFilter}${joinFilter}${sortFilter}`;
            logger.debug("query:", query)
            return connection.query(query).then(rows => {
                connection.end();
                return rows;
            });
        });
    };

    query(query: string) {
        return this.createConnection().then(connection => {
            logger.debug("query:", query)            
            return connection.query(query).then(rows => {
                connection.end();
                return rows;
            });
        });
    }

    /**
     * Find object by ID with an optional filter for include/fields.
     * 
     * @param: modelName string
     *   the name of the table/record to be fetched.
     * @param: id		
     *   Primary key value
     * @param: [where] IWhereFilter	
     *   Optional Filter JSON object
     */
    findById(modelName: string, id, where?: IWhereFilter) {
        return this.createConnection().then(connection => {
            let whereFilter = where ? ` AND ${where}` : "";
            return connection.query(`SELECT * FROM ${modelName} AS ${modelName} WHERE id = ${id}${whereFilter}`).then(row => {
                connection.end();
                return row;
            });
        });
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
        for (let property in model) {
            if (model.hasOwnProperty(property)
                && typeof model[property] !== 'function'
                && property !== '_id'
                && property !== '_name'
            ) {
                attributes.properties.push(property);
                attributes.values.push(model[property]);
            }
        }
        return attributes;
    }
}
