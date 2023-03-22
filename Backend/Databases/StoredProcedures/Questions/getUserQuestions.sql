CREATE PROCEDURE getUserQuestions(
@userId VARCHAR (100))

AS
BEGIN

	SELECT * FROM Questions
	WHERE userId = @userId
END