import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import httpStatus from "http-status";

import customerRoute from './routes/customer.routes'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(cors())
app.options('*', cors())

app.use('/api/customer', customerRoute)

app.get('/', (req, res) => {
    res.json({
        message: 'Customer API init'
    }).status(httpStatus.OK)
})

export default app
