const mongoose = require("mongoose");

const Employee = require("../models/employee");

exports.get_all_employees = (req, res) => {
    Employee.find()
        .select("-__v")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                employees: docs
            };

            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.create_employee = (req, res) => {
    Employee.find({ email: req.body.email })
        .exec()
        // eslint-disable-next-line consistent-return
        .then(employee => {
            if (!req.body.email) {
                return res.status(401).json({
                    message: `Email missing`
                });
            }
            if (employee.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            const newEmployee = new Employee({
                _id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            });

            newEmployee.save()
                .then(result => {
                    res.status(201).json({
                        message: "Succesfully created an employee",
                        createdEmployee: {
                            firstname: result.firstname,
                            lastname: result.lastname,
                            email: result.email
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
};

exports.delete_employee = (req, res) => {
    Employee.deleteOne({ email: req.params.email })
        .exec()
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: `Deletion failed`
                });
            }
            return res.status(200).json({
                message: "Employee succesfully deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
