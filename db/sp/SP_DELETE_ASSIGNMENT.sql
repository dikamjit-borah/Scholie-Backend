CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETE_ASSIGNMENT`(
	p_assignmentId varchar(255)
)
BEGIN
DECLARE d_assignmentId varchar(255);
DECLARE d_message varchar(255);
	SELECT 
    assignmentId
INTO d_assignmentId FROM
    assignments_tutors
WHERE
    assignmentId = p_assignmentId;
    IF ISNULL(d_assignmentId) THEN SET d_message = 'Details not found for the given assignment id';
    ELSE
		START TRANSACTION;
			DELETE FROM assignments_tutors 
WHERE
    assignmentId = p_assignmentId;
			DELETE FROM assignments_students 
WHERE
    assignmentId = p_assignmentId;
		COMMIT;
        SET d_message = 'Assignment successfully deleted';
	END IF;
SELECT d_message;
END