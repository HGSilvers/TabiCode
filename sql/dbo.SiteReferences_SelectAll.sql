ALTER PROCEDURE [dbo].[SiteReferences_SelectAll]
    @PageNumber INT,
    @PageSize INT
    -- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    -- ::::::::::::::::::::::::::::::
    -- Author: Hannah Silvers
    -- Creation Date: 06/06/2024
    -- Description: A Select All procedure with Pagination for Site References capturing the Name and ID of the User,
    --              and the ID and type of reference the User selected.
    -- ::::::::::::::::::::::::::::::
    -- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
AS
/*
    Execute dbo.SiteReferences_SelectAll
*/
BEGIN
    SET NOCOUNT ON;

    SELECT sr.Id,
           sr.ReferenceTypeId,
           rt.Name AS ReferenceTypeName,
           dbo.fn_GetUserJSON(sr.UserId) AS UserJSON,
           COUNT(*) OVER() AS TotalCount

    FROM SiteReferences sr

    JOIN ReferenceTypes rt ON sr.ReferenceTypeId = rt.Id
    ORDER BY sr.Id

    OFFSET (@PageNumber - 1) * @PageSize ROWS

    FETCH NEXT @PageSize ROWS ONLY;

END