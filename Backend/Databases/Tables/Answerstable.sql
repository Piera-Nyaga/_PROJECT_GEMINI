CREATE TABLE Answers(
    Id VARCHAR(100) PRIMARY KEY,
    Description VARCHAR(1000) ,
	userId VARCHAR (100),
	questionId VARCHAR(100),
	isPreferred BIT NOT NULL DEFAULT 0,
    isSent BIT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),

	CONSTRAINT fk_question_answers_id
    FOREIGN KEY (userId) REFERENCES Users(Id), FOREIGN KEY (questionId) REFERENCES Questions(Id)
	ON DELETE CASCADE
)


