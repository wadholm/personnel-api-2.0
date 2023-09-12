# Personnel API

RESTful API for client X's personnel records.

The API is built with JavaScript, Node.js and Express, uses MongoDB as a database and returns JSON.

The API consist of three operations where one can:
1. Add a new employee
2. Delete an employee
3. Get all employees

### Constraints
When adding a new employee, a **first name**, **last name**, and **unique email address** are required.

## Run API locally
Open [http://localhost:1337/api/v1](http://localhost:1337/api/v1) to view it in the browser.

Clone the repository to get a clean install.

### System requirements
To run the server on your local machine you need to have Node.js with NPM installed.


### To install all prerequisites needed for this application, run:

```shell
npm install
```

### In the project directory, you can run:

```
npm start
```

Runs the server in development mode.

```
npm run prod
```

Runs the server in production mode.

```
npm run test
```

Runs the test suite.

## REST-API documentation

Documentation on how to use the Personnel API. 

#### Example API response: 
```
$ curl http://localhost:1337/api/v1

{
	"title": "Personnel API",
	"message": "Manual on how to use the API is found at: https://github.com/wadholm/personnel-api/tree/dev#readme"
}
```


### employee

An employee has the following attributes:
```
_id
firstname
lastname
email
```

### Get all employees
```
GET /api/v1/employees
```
#### Result:
```
{
    "count": 3,
    "employees": [
        {
            "_id": "63ef6c5b88c9e9ac9cb96288",
            "firstname": "Sherlock",
            "lastname": "Holmes",
            "email": "holmes@bakerstreet.com"
        },
        {
            "_id": "63ef6c5b88c9e9ac9cb96289",
            "firstname": "John",
            "lastname": "Watson",
            "email": "watson@bakerstreet.com"
        },
        {
            "_id": "63ef6c5b88c9e9ac9cb96293",
            "firstname": "James",
            "lastname": "Moriarty",
            "email": "hi@moriarty.com"
        }
    ]
}
```

### Create an employee
```
POST /api/v1/employees
```
#### Required parameters:
```
firstname
lastname
email
```
The email address needs to be unique. 

#### Example body, in JSON:
```
{
    "firstname": "Mycroft",
    "lastname":  "Holmes",
    "email": "holmes@mi6.co.uk"
}
```

#### Result:
```
{
    "message": "Succesfully created an employee",
    "createdEmployee": {
        "firstname": "Mycroft",
        "lastname": "Holmes",
        "email": "holmes@mi6.co.uk"
    }
}
```
#### Possible errors, besides errors returned from database:

```
{
    "message": "Email already exists"
}
```
The email provided already exists. A new employee's email address needs to be unique. 
```
{
    "error": {
        "errors": {
            "lastname": {
                "name": "ValidatorError",
                "message": "Path `lastname` is required.",
                "properties": {
                    "message": "Path `lastname` is required.",
                    "type": "required",
                    "path": "lastname"
                },
                "kind": "required",
                "path": "lastname"
            }
        },
        "_message": "Employee validation failed",
        "name": "ValidationError",
        "message": "Employee validation failed: lastname: Path `lastname` is required."
    }
}
```
Validation error. A required parameter is missing. 

### Delete an employee
```
DELETE /api/v1/employees/:email
```
#### Required parameters:
```
email
```
#### Result:
```
{
    "message": "Employee succesfully deleted"
}
```
#### Possible error, besides errors returned from database:
```
{
    "message": "Deletion failed"
}
```




