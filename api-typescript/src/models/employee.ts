import mongoose from "mongoose";

export interface IEmployee {
    firstname: string;
    lastname: string;
    email: string;
}

export interface IEmployeeModel extends IEmployee, mongoose.Document {}

const EmployeeSchema: mongoose.Schema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
});

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema)
