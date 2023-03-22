CREATE PROCEDURE getAllwithPagination( @PageNumber INT, @PageSize INT )
AS
BEGIN

	SELECT * FROM Questions
	ORDER By Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END