using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReferences;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class SiteReferenceService : ISiteReferenceService
    {
        private readonly IDataProvider _data;
        private readonly ILookUpService _lookUpService;

        public SiteReferenceService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public List<LookUp> GetAllReferenceTypes()
        {
            List<LookUp> referenceTypes = new List<LookUp>();

            string procName = "[dbo].[ReferenceTypes_SelectAll]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                LookUp referenceType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
                referenceTypes.Add(referenceType);
            });

            return referenceTypes;
        }

        public int Add(SiteReferenceAddRequest model, int createdBy)
        {
            int id = 0;

            string procName = "[dbo].[SiteReferences_Insert]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ReferenceTypeId", model.ReferenceTypeId);
                    col.AddWithValue("@UserId", model.UserId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    col.Add(idOut);
                },
                delegate (SqlParameterCollection col)
                {
                    object idObj = col["@Id"].Value;
                    if (idObj != null && idObj != DBNull.Value)
                    {
                        int.TryParse(idObj.ToString(), out id);
                    }
                });

            return id;
        }

        public List<SiteReference> GetAll(int pageNumber, int pageSize)
        {
            List<SiteReference> siteReferences = new List<SiteReference>();

            string procName = "[dbo].[SiteReferences_SelectAll]";

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageNumber", pageNumber);
                    col.AddWithValue("@PageSize", pageSize);
                },
                delegate (IDataReader reader, short set)
                {
                    SiteReference siteReference = MapSiteReference(reader);
                    siteReferences.Add(siteReference);
                });

            return siteReferences;
        }

        private SiteReference MapSiteReference(IDataReader reader)
        {
            SiteReference siteReference = new SiteReference();
            int startingIndex = 0;

            siteReference.Id = reader.GetSafeInt32(startingIndex++);
            siteReference.ReferenceType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            string userJson = reader.GetSafeString(startingIndex++);
            if (!string.IsNullOrEmpty(userJson))
            {
                siteReference.User = MapUserFromJson(userJson);
            }

            return siteReference;
        }

        private BaseUser MapUserFromJson(string userJson)
        {
            BaseUser user = null;

            try
            {
                user = Newtonsoft.Json.JsonConvert.DeserializeObject<BaseUser>(userJson);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing UserJSON: {ex.Message}");
            }

            return user;
        }
    }
}