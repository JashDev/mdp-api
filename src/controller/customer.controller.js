import CustomerModel from "../model/customer.model";
import {
    findCustomerByIdService,
    findCustomerListService,
    getAverageCustomerAgesService,
    saveCustomerService
} from "../services/customer.service";
import httpStatus from "http-status";

export const saveCustomer = async (req, res) => {
    const {name, lastName, birthday} = req.body

    const customer = new CustomerModel({
        name,
        lastName,
        birthday
    })

    try {
        const [{insertId}] = await saveCustomerService({customer})
        const [rows] = await findCustomerByIdService({customerId: insertId})

        if (rows.length <= 0) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error al crear el cliente"
            })
        }

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Cliente creado correctamente",
            data: {
                id: insertId,
                customer: CustomerModel.fromJson(rows[0])
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al crear el cliente",
            data: {
                errorMessage: error.message,
                errorJSON: JSON.stringify(error)
            }
        })
    }
}

export const findCustomer = async (req, res) => {
    const {customerId} = req.params

    try {
        const [rows] = await findCustomerByIdService({customerId})

        if (rows.length <= 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Cliente no encontrado"
            })
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: "Cliente encontrado",
            data: {
                customer: CustomerModel.fromJson(rows[0])
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al buscar el cliente",
            data: {
                errorMessage: error.message,
                errorJSON: JSON.stringify(error)
            }
        })
    }
}

export const allCustomers = async (req, res) => {
    try {
        const [rows] = await findCustomerListService()

        if (rows.length <= 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "No se encontraron clientes"
            })
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: "Clientes encontrados",
            data: {
                customers: CustomerModel.fromJsonArray(rows)
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al buscar los clientes",
            data: {
                errorMessage: error.message,
                errorJSON: JSON.stringify(error)
            }
        })
    }
}

export const getAverageCustomerAges = async (req, res) => {
    try {
        const [rows] = await getAverageCustomerAgesService()

        if (rows.length <= 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "No se encontraron clientes para promediar las edades"
            })
        }

        const averageAge = parseFloat(rows[0]?.average_age)

        res.status(httpStatus.OK).json({
            success: true,
            message: "Promedio de edades obtenido",
            data: {
                average: averageAge
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener el promedio de edades de los clientes",
            data: {
                errorMessage: error.message,
                errorJSON: JSON.stringify(error)
            }
        })
    }
}
