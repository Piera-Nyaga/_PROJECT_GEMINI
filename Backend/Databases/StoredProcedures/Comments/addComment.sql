CREATE PROCEDURE addComment (@id VARCHAR(100), @description VARCHAR(100), @userId VARCHAR (100), @answerId VARCHAR(100), @createdAt DATETIME)

AS
BEGIN
INSERT INTO Comments(Id, Description, userId, answerId, createdAt)
VALUES(@Id,@description, @userId, @answerId, @createdAt )

END