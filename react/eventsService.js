import axios from "axios";
import {
    onGlobalError,
    onGlobalSuccess,
    API_HOST_PREFIX,
  } from "./serviceHelpers";


const eventsService = {endpoint: `${API_HOST_PREFIX}/api/events`};


eventsService.deleteEvent = (id) => {
    const config = {
      method: "DELETE",
      url: `${eventsService.endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  }

  eventsService.updateEvent = (id, payload) => {
    const config = {
      method: "PUT",
      url: `${eventsService.endpoint}/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  }

eventsService.addEvent = (payload) => {
    const config = {
      method: "POST",
      url: `${eventsService.endpoint}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  eventsService.getEventById = (id) => {
    const config = {
      method: "GET",
      url: `${eventsService.endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

eventsService.getAll = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${eventsService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

    eventsService.getEvents = (pageIndex, pageSize) => {
      const config = {
          method: "GET",
          url: `${eventsService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
          withCredentials: true,
          crossdomain: true,
          headers: { "Content-Type": "application/json"}
      };
  
      return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  

  export default eventsService;
  