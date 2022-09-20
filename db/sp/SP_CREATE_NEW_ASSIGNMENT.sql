CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CREATE_NEW_ASSIGNMENT`(
p_assignmentId varchar(255), 
p_assignmentDescription longtext, 
p_assignmentPublishedAt datetime, 
p_assignmentDeadline datetime, 
p_tutorId integer,
p_assignmentStudents varchar(255),
p_assignmentStudentsCount integer
)
BEGIN 

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _value TEXT DEFAULT NULL;

START TRANSACTION;
	INSERT INTO assignments_tutors (assignmentId, tutorId, assignmentDescription, assignmentPublishedAt, assignmentDeadline) 
	VALUES (p_assignmentId, p_tutorId, p_assignmentDescription, p_assignmentPublishedAt, p_assignmentDeadline); 
    iterator:
	LOOP
		IF CHAR_LENGTH(TRIM(p_assignmentStudents)) = 0 OR p_assignmentStudents IS NULL THEN
		LEAVE iterator;
		END IF;
        SET _next = SUBSTRING_INDEX(p_assignmentStudents,',',1);
		SET _nextlen = CHAR_LENGTH(_next);
        SET _value = TRIM(_next);
        INSERT INTO assignments_students (assignmentId, tutorId, studentId) VALUES (p_assignmentId, p_tutorId,_value);
        SET p_assignmentStudents = INSERT(p_assignmentStudents,1,_nextlen + 1,'');
	END LOOP;
    COMMIT;
    SELECT 1;
END