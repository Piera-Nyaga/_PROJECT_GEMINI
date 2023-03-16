CREATE PROCEDURE postAnswer(@id VARCHAR(100), @description VARCHAR(100), @userId VARCHAR (100), @questionId VARCHAR(100))

AS
BEGIN
INSERT INTO Answers (Id, Description, userId, questionId)
VALUES(@Id,@description, @userId, @questionId)

END