/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require("../index");

chai.should();
chai.use(chaiHttp);

before((done) => {
    mongoose.connection.collections.employees.drop(() => {
        done();
    });
});

const employee = {
    firstname: "John",
    lastname: "Doe"
};

describe('Employees model', () => {
    describe('POST /api/v1/employees', () => {
        it('should get 401 for missing email', (done) => {

            chai.request(server)
                .post("/api/v1/employees")
                .send(employee)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(401);
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Email missing");
                    done();
                });
        });
        it('should get 201 creating an employee', (done) => {
            employee.email = "test@example.com";

            chai.request(server)
                .post("/api/v1/employees")
                .send(employee)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("createdEmployee");
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Succesfully created an employee");
                    done();
                });
        });
        it('should get 409 email already exists', (done) => {
            chai.request(server)
                .post("/api/v1/employees")
                .send(employee)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(409);
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Email already exists");
                    done();
                });
        });
        it('should get 500 for required field is missing', (done) => {
            employee.email = "new@example.com";
            delete employee.firstname;

            chai.request(server)
                .post("/api/v1/employees")
                .send(employee)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(500);
                    done();
                });
        });
    });
    describe('GET /api/v1/employees', () => {
        it('should get 200 HAPPY PATH for employees', (done) => {
            chai.request(server)
                .get("/api/v1/employees")
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('DELETE /api/v1/employees/:email', () => {
        it('should get 404 deletion failed', (done) => {
            chai.request(server)
                .delete(`/api/v1/employees/fake@email.com`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Deletion failed");
                    done();
                });
        });
        it('should get 200 delete employee by email', (done) => {
            employee.email = "test@example.com";

            chai.request(server)
                .delete(`/api/v1/employees/${employee.email}`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Employee succesfully deleted");
                    done();
                });
        });
    });
});