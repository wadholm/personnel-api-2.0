const express = require('express');

const router = express.Router();
const EmployeeController = require("../controllers/employees");

router.get('/', EmployeeController.get_all_employees);

router.post('/', EmployeeController.create_employee);

router.delete('/:email', EmployeeController.delete_employee);

module.exports = router;
