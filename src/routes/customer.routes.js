import express from "express";
import {allCustomers, findCustomer, saveCustomer, getAverageCustomerAges} from "../controller/customer.controller";

const router = express.Router();

router.get('/', allCustomers)
router.get('/:customerId', findCustomer)
router.post('/', saveCustomer)
router.get('/average/ages', getAverageCustomerAges)

export default router
