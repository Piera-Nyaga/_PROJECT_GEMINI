CREATE OR ALTER PROCEDURE getQuestionContent
    @questionId VARCHAR(100)
AS
BEGIN
   SELECT q.Id, q.Title, q.Description, q.Code,u.Id AS userId, u.UserName AS UserName, q.createdAt,
          JSON_QUERY ((SELECT a.Id, a.userId,u.UserName AS UserName, a.Description, a.isPreferred, a.createdAt,
                              (SELECT vote, userId FROM votes WHERE answerId = a.Id FOR JSON PATH) AS Votes,
                              (SELECT Id, userId, Description, createdAt 
                                FROM Comments WHERE answerId = a.Id FOR JSON PATH ) AS Comments
                        FROM Answers AS a WHERE a.questionId = q.Id FOR JSON PATH)) AS Answers
    FROM Questions AS q
    JOIN Users AS u ON q.userId = u.Id
    WHERE q.Id = @questionId;
END