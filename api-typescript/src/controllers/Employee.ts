import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Employee from "../models/employee";

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, email } = req.body;
        if (!email) {
            return res.status(401).json({
                message: "Email missing."
            });
        }

        const existingEmployee = await Employee.findOne({ email }).exec();

        if (existingEmployee) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        const newEmployee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            firstname,
            lastname,
            email,
        });

        const result = await newEmployee.save();

        return res.status(201).json({
            message: "Successfully created an employee",
            createdEmployee: {
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            },
        });
    } catch (error) {
        res.status(500).json({ error })
    }
};

const readEmployee = async (req: any, res: Response, next: NextFunction) => {
    const { email } = req.params;

    try {
        const employee = await Employee.findOne({ email }).select("-__v");
        return employee ? res.status(200).json({ employee }) :
            res.status(404).json({
                message: "Email not found"
            });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const docs = await Employee.find().select("-__v")
        const result = {
            count: docs.length,
            employees: docs
        };
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateEmployee = async (req: any, res: Response, next: NextFunction) => {
    const { email } = req.params;

    try {
        const employee = await Employee.findOne({ email });

        if (employee) {
            employee.set(req.body);
            const result = await employee.save();

            return res.status(201).json({
                message: "Successfully updated an employee",
                updatedEmployee: {
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                },
            });
        } else {
            res.status(404).json({
                message: "Email not found"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const deleteEmployee = async (req: any, res: Response, next: NextFunction) => {
    const email = req.params;

    try {
        const employee = await Employee.findByIdAndDelete({ email });
        return (employee ? res.status(201).json({ employee, message: 'Deleted' }) : res.status(404).json({ message: 'not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createEmployee, readEmployee, readAll, updateEmployee, deleteEmployee };
