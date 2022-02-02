import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mysql: {
        user: process.env.DB_USER || 'root',
        database: process.env.DB_NAME || '',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
    },
}

export default config
