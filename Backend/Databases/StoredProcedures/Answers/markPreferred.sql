CREATE PROCEDURE markPreferred( @id VARCHAR(100))
AS
BEGIN

UPDATE Answers SET isPreferred = 1 WHERE Id=@id
END