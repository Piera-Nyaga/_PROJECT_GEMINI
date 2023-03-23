CREATE OR ALTER PROCEDURE getQuestionContent
    @questionId VARCHAR(100)
AS
BEGIN
    SELECT q.Id, q.Title, q.Description, q.Code, u.UserName AS UserName, q.createdAt AS QuestionDtae,
           JSON_QUERY((SELECT a.Id, a.userId,u.UserName AS UserName, a.Description, a.isPreferred, a.createdAt AS AnswerDate,
                               (SELECT vote, userId FROM votes WHERE answerId = a.Id) AS Votes,
                               (SELECT Id, userId, Description, createdAt AS CommentDate 
                                FROM Comments WHERE answerId = a.Id) AS Comments
                        FROM Answers AS a WHERE a.questionId = q.Id)) AS Answers
    FROM Questions AS q
    JOIN Users AS u ON q.userId = u.Id
    WHERE q.Id = @questionId;
END