import db from '../config/database'

export const saveCustomerService = async ({customer}) => {
    const query = `INSERT INTO customers (name, last_name, birthday, created_at) VALUES (?,?,?, now());`
    return await db.query(query, [customer.name, customer.lastName, customer.birthday])
}

export const findCustomerByIdService = async ({customerId}) => {
    const query = `SELECT * FROM customers WHERE id = ?`
    return await db.query(query, [customerId])
}

export const findCustomerListService = async () => {
    const query = `SELECT * FROM customers`
    return await db.query(query)
}

export const getAverageCustomerAgesService = async () => {
    const query = `SELECT AVG(TIMESTAMPDIFF(YEAR, birthday, CURDATE())) AS average_age FROM customers`
    return await db.query(query)
}
