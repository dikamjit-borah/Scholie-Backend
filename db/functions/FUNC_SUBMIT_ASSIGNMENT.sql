CREATE DEFINER=`root`@`localhost` FUNCTION `FUNC_SUBMIT_ASSIGNMENT`(p_studentId integer,
p_assignmentId varchar(255),
p_assignmentRemark varchar(255)) RETURNS varchar(255) CHARSET utf8mb4
BEGIN   
	DECLARE d_entryId integer;
    DECLARE d_assignmentStatus integer;
    
SELECT 
    entryId, assignmentStatus
INTO d_entryId , d_assignmentStatus FROM
    assignments_students
WHERE
    assignmentId = p_assignmentId
        && studentId = p_studentId;
	IF ISNULL(d_entryId) THEN RETURN 'Details not found for the given assignment or student id';  
	ELSE 
		IF (d_assignmentStatus = 2) THEN RETURN 'Assignment has already been submitted';  
        ELSE UPDATE assignments_students SET assignmentRemark = p_assignmentRemark, assignmentStatus = 2  WHERE assignmentId = p_assignmentId AND studentId = p_studentId;
        RETURN 'Assignment successfully submitted'; 
	END IF;
    END IF;
END