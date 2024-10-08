ALTER PROCEDURE [dbo].[SiteReferences_Insert]
		@ReferenceTypeId INT,
		@UserId INT,
		@Id INT OUTPUT
		 -- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		 -- ::::::::::::::::::::::::::::::
		 -- Author: Hannah Silvers
		 -- Creation Date: 06/06/2024
		 -- Description: Insert procedure for SiteReferences, when the User makes their selection and submits it, their ID and the ID of their reference is stored in the table.
		 -- ::::::::::::::::::::::::::::::
		 -- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	AS

	BEGIN

    INSERT INTO dbo.SiteReferences (ReferenceTypeId, UserId)
    VALUES (@ReferenceTypeId, @UserId);

    SET @Id = SCOPE_IDENTITY();

	END