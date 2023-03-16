CREATE TABLE Comments(
    Id VARCHAR(100) PRIMARY KEY,
    Description VARCHAR(1000) ,
	userId VARCHAR (100),
	answerId VARCHAR(100),
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),

	CONSTRAINT fk_answers_comments_id
    FOREIGN KEY (userId) REFERENCES Users(Id), FOREIGN KEY (answerId) REFERENCES Answers(Id)
	ON DELETE CASCADE
)


