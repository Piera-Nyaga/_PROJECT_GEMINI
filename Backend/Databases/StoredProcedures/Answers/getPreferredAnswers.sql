CREATE OR ALTER PROCEDURE getPreferredAnswers

AS
BEGIN

SELECT * FROM Answers
WHERE isPreferred = 1 AND isSent = 0
END