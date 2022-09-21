module.exports = {
    messages: {
        SMTHNG_WRNG: "Something went wrong. Please try again",
        DB_CONN_SUCCESS: "Database connection established successfully",
        DB_CONN_ERROR: "Database connection could not be established",

        SIGNIN_ERR: "Error signing in",
        SIGNIN_SUCCESS: "Sign in successful",
        SIGNIN_FAILED: "Invalid credentials. Please try again with correct username and password",

        ASSIGNMENT_CREATE_ERR: "Error creating assignment",
        ASSIGNMENT_CREATE_SUCCESS: "Assignment created successfully",

        ASSIGNMENT_SUBMIT_ERR: "Error submitted assignment",
        ASSIGNMENT_SUBMIT_SUCCESS: "Assignment submitted successfully",
        ASSIGNMENT_SUBMIT_EXIST: "Assignment has already been submitted",

        ASSIGNMENT_DETAILS_ERR: "Error fetching assignment details",
        ASSIGNMENT_DETAILS_SUCCESS: "Assignment details fetched successfully",
        ASSIGNMENT_DETAILS_EMPTY: "Details for the given id(s) not found",

        ASSIGNMENTS_ERR: "Error fetching assignments",
        ASSIGNMENTS_SUCCESS: "Assignments fetched successfully",
        ASSIGNMENTS_EMPTY: "Assignments for the given id(s) or filters not found",

        ID_INVALID: "The provided id(s) are empty or invalid. Please try again",
        USER_EMPTY: "Username or password is empty. Please try again with a proper request",
        USER_UNAUTHORIZED: "User is not authorized. Please sign in and try again",
        USER_NOT_ALLOWED: "Current user is not permitted for the following action. Please sign in with different credentials and try again"
    }
}