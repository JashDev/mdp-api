import mysql from 'mysql2'
import config from './config'

const connection = mysql.createPool({
    host: config.mysql.host || 'localhost',
    user: config.mysql.user || 'root',
    password: config.mysql.password || '',
    database: config.mysql.database || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default connection.promise()
