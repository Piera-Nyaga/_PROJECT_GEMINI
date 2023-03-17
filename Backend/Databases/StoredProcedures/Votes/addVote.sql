CREATE OR ALTER PROCEDURE AddOrUpdateVote ( @id VARCHAR(100), @vote INT , @userId VARCHAR (100), @answerId VARCHAR(100), @createdAt DATETIME)
AS
BEGIN

IF EXISTS(SELECT * FROM Votes WHERE Id =@id AND  @userId=userId AND @answerId=answerId )
BEGIN
UPDATE Votes SET Id=@id, vote=@vote,userId=@userId, answerId=@answerId, createdAt=@createdAt 
WHERE Id =@id
END

ELSE
BEGIN
INSERT INTO Votes (Id, vote, userId, answerId, createdAt)
VALUES( @id, @vote,@userId,@answerId,@createdAt)
END
END