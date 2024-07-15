	ALTER PROCEDURE [dbo].[ReferenceTypes_SelectAll]

		-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		-- ::::::::::::::::::::::::::::::
		-- Author: Hannah Silvers
		-- Creation Date: 06/06/2024
		-- Description: A Select All procedure for Reference Types Lookup table.
		-- ::::::::::::::::::::::::::::::
		-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	AS

	/*
		Execute dbo.ReferenceTypes_SelectAll
	*/


	BEGIN

		SELECT	Id,
				Name

			FROM dbo.ReferenceTypes

	END