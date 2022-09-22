CREATE DEFINER=`root`@`localhost` FUNCTION `FUNC_UPDATE_ASSIGNMENT`(p_assignmentId varchar(255),
p_assignmentDescription longtext,
p_assignmentDeadline datetime) RETURNS varchar(255) CHARSET utf8mb4
BEGIN   
	DECLARE d_assignmentId varchar(255);
    
SELECT 
    assignmentId
INTO d_assignmentId FROM
    assignments_tutors
WHERE
    assignmentId = p_assignmentId;
	IF ISnull(d_assignmentId) THEN RETURN 'Details not found for the given assignment id';  
	ELSE 
		IF (p_assignmentDescription != 'null') AND (p_assignmentDeadline != 'null') THEN
			UPDATE assignments_tutors SET assignmentDescription = p_assignmentDescription, assignmentDeadline = p_assignmentDeadline WHERE assignmentId = p_assignmentId;
        END IF;
        IF (p_assignmentDescription != 'null') THEN
			UPDATE assignments_tutors SET assignmentDescription = p_assignmentDescription WHERE assignmentId = p_assignmentId;
		END IF;
        IF (p_assignmentDeadline != 'null') THEN
			UPDATE assignments_tutors SET assignmentDeadline = p_assignmentDeadline WHERE assignmentId = p_assignmentId;
	   END IF;
       RETURN 'Assignment successfully updated'; 
	
    END IF;
END