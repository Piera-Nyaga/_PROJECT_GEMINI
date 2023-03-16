CREATE PROCEDURE getPreferredAnswerDetails
@questionId VARCHAR(100)
AS
BEGIN
SELECT u.UserName, u.Email
FROM Users u
INNER JOIN Answers a ON u.Id = a.userId
WHERE a.questionId= @questionId AND a.isPreferred = 1
END