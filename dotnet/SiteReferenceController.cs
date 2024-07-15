using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReferences;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/siteref")]
    [ApiController]  

    public class SiteReferenceApiController : BaseApiController
    {
        private ISiteReferenceService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SiteReferenceApiController(ISiteReferenceService service, ILogger<SiteReferenceApiController> logger, IAuthenticationService<int> authService)
            : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("reftypes")]
        public ActionResult<ItemResponse<List<LookUp>>> GetAllReferenceTypes()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<LookUp> referenceTypes = _service.GetAllReferenceTypes();
                response = new ItemResponse<List<LookUp>> { Item = referenceTypes };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<List<SiteReference>>> GetAll(int pageNumber, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<SiteReference> siteReferences = _service.GetAll(pageNumber, pageSize);
                response = new ItemResponse<List<SiteReference>> { Item = siteReferences };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(SiteReferenceAddRequest model)
        {
            ObjectResult result = null;
            int id = 0;

            try
            {
                int createdBy = _authService.GetCurrentUserId();
                id = _service.Add(model, createdBy);

                if (id == 0)
                {
                    ErrorResponse response = new ErrorResponse("Item not created.");
                    result = StatusCode(500, response);
                }
                else
                {
                    ItemResponse<int> response = new ItemResponse<int> { Item = id };
                    result = Created201(response);
                }
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, response);
            }

            return result;
        }
    }
}