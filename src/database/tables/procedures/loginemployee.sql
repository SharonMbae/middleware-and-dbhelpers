CREATE OR ALTER PROCEDURE loginemployee (@email VARCHAR (200),@password VARCHAR (200))

AS
BEGIN

SELECT * FROM Employees WHERE email= @email 

END