using Sabio.Models.Domain;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReferences;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISiteReferenceService
    {
        List<LookUp> GetAllReferenceTypes();
        int Add(SiteReferenceAddRequest model, int createdBy);   
        List<SiteReference> GetAll(int pageNumber, int pageSize);
    }
}