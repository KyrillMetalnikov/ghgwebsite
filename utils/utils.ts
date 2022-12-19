import { rejects } from "assert";
import { createPool, Pool } from "mysql2";
import { resolve } from "path";
import { DATA_SOURCES } from "../config/vars.config";
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * Generates pool connection to be used throughout the app
 */

export const init = () => {
    try {
        pool = createPool({
            connectionLimit: dataSource.DB_CONNECTION_LIMIT,
            host: dataSource.DB_HOST,
            user: dataSource.DB_USER,
            password: dataSource.DB_PASSWORD,
            database: dataSource.DB_DATABASE,
        });

        console.debug('MySql Adapter Pool generated sucessfully');
    } catch (error) {
        console.error('[mysql.connector][init][error]: ', error);
        throw new Error('failed to initialize pool');
    }
};

/**
 * executes SQL queries in MySQL db
 * 
 * @param {string} query - provide a valid SQL query
 * @param {string[] Object} params - provide the parameterized values used in the query
 */

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results: any) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL')
    }
}

export const checkIfInDB = async function(query: string, params: string[]): Promise<boolean> {
    let result: Object = await execute(query, params);
    if (Object.keys(result).length === 0) {
        return false;
    } else {
        return true;
    }
}

export const validateWholeNumber = function(value: number): boolean {
    if (!Number.isNaN(value) && value > 0 && Number.isInteger(value)) {
        return true
    } else {
        return false
    }
}