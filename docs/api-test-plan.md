Test ID Request Expected Result
T01 GET /api/issues 200; JSON array returned.
T02 POST valid title, description, priority 201; complete created issue returned.
T03 POST missing title 400; VALIDATION_ERROR.
T04 POST invalid priority = Critical 400; VALIDATION_ERROR.
T05 PATCH existing issue status =
Resolved
200; returned status is Resolved.
T06 PATCH status = Deleted 400; VALIDATION_ERROR.
T07 PATCH unknown issue ID 404; ISSUE_NOT_FOUND.
T08 GET when no issues exist 200; empty JSON array.
T09 Send unexpected extra server-owned
fields
Server ignores/rejects according to
contract; client cannot choose
authoritative id/status/createdAt.
