# Scholie
Application for <br>
- tutors to assign students with assignments and view their submissions  <br> 
- students to view and submit assigned assignments <br>
A simple stateless microservice with few API endpoints: <br>
- Authentication endpoint
- REST API endpoints for a virtual classroom app
## Tech Stack
`Node.js`
`Express.js`
`jsonwebtoken`
`sequelize`
`sequelize-auto-migrations-v2`
`uuid`

## ER
[ER model](ER.md "ER model") <br>
[ER diagram](ERD.jpg "ER diagram") <br>

The database scholie_db comprises of 2 tables `assignments_tutors` and `assignments_students`. `assignments_tutors` has a `one-to-many` relationship with the `studentId` of `assignments_students`. Indexes are created on `assignmentId` and `tutorId` in both the tables.
## Installation
To run the application locally, set local db configuration in the config.json present in the config folder
```
npm run prod
```
>This command will also run generated migrations to create necessary tables (if not present) required for proper functioning of the application

## Api
Documentation for the api endpoints provided in the following postman collection
```
[https://documenter.getpostman.com/view/18999728/2s7ZE4NQwa](https://documenter.getpostman.com/view/18999728/2s7ZE4NQwa)
```
## Project structure
The project comprises of the following important entities
- routes
    - route files that point to the specific endpoint
- controllers 
    - handle request and responses
- services
    - handle db operations and auth token generation
- middlewares
    - middleware functions that lie between the routes
- db
    - database stored procedures and functions
- migrations
    - migration files to be run for table changes
- utils
    - helper functions and constants
## Functionality
Some important functionalities of the application 
#### Authentication
On hitting the `signIn` endpoint, the user receives a jwt token whose payload is made up of the `userName` and `userType`. This token is to be provided for each of the tutor and student endpoints as a `Authorization` header. The `authenticateUser` middleware verifies the validity of the token, and if valid, sets the jwt payload inside `res.locals`.user. The `setTutorUserType` and `setStudentUserType` sets the `userType` (0 for tutor & 1 for student) for the route inside `res.locals`. Middleware `checkUserType` checks the `res.locals.user.userType` with the `res.locals.userType` for checking whether the signed in user is allowed inside that route. 

>Invalid tokens, unauthenticated users and unauthorized userTypes are not allowed inside the protected routes

##### Important assumptions
- User type
    - Tutor = `0`
    - Student = `1`
- Assignment status
    - Tutor
        - Ongoing = `0`
        - Scheduled = `1`
    - Student
        - Overdue = `0`
        - Pending = `1`
        - Submitted = `2`
    > If a assignment is `Scheduled` by the tutor, it is set as `Pending` for the student
    > If a assignment is set as `Ongoing` by the tutor, it is set as `Overdue` for the student

#### Assignment creation
If the user is authenticated and authorized (as a tutor) to use `tutor/assignment/create`, then for creating an assignment a database SP `SP_CREATE_NEW_ASSIGNMENT` is called which contains a transaction, that inserts the assignment with a `assignmentId` into `assignment_tutors`, and for each of the assigned students, inserts into the `assignment_students` inside a `LOOP`

#### Assignment submission
If the user is authenticated and authorized (as a student) to use `student/assignment/submit`, then a database function `FUNC_SUBMIT_ASSIGNMENT` is called which performs the following actions - 
- check if `entryId` is present for the `assignmentId` and `studentId`
- check if assignment is already submitted
- if conditions are met, then change the submission status of the assignment to submitted (`assignmentStatus` is updated to 2)

#### Fetching all assignments
For the tutor feed, `publishedAt` (0 = ongoing or 1 = scheduled) filters can be applied
For the student feed,  `publishedAt` (0 = ongoing or 1 = scheduled) and `status` (0 = overdue, 1 = pending, 2 = submitted) filters can be applied





