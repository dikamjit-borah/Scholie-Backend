Table assignments_tutors {
  assignmentId varchar [pk]
  tutorId int
  assignmentdescription longtext
  assignmentPublishedAt datetime
  assignmentDeadline datetime
  assignmentStatus tinyint
  Indexes {
    (assignmentId, tutorId)
  }
}

Table assignments_students {
  entryId int [pk]
  assignmentId varchar
  tutorId int
  studentId int
  assignmentRemark longtext
  assignmentStatus tinyint
  Indexes {
    (assignmentId, tutorId)
  }
}

Ref: assignments_tutors.assignmentId < assignments_students.studentId
Ref: assignments_tutors.assignmentId - assignments_students.tutorId

