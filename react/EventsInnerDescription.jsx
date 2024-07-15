import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import eventsService from "../../services/eventsService";
import debug from "sabio-debug";
import toastr from "toastr";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Comment2 from "../comments/Comment2";


const _logger = debug.extend("EventsInnerDescription");

const EventsInnerDescription = ({ currentUser }) => {

  _logger("Current logged in user::", currentUser);

  const navigate = useNavigate();
  const location = useLocation();
  const [eventId] = useSearchParams();
  const [showComments, setShowComments] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    id: 0,
    eventTypeId: "",
    name: "",
    summary: "",
    shortDescription: "",
    venueId: "",
    eventStatusId: "",
    imageUrl: "",
    externalSiteUrl: "",
    isFree: "",
    dateStart: "",
    dateEnd: "",
  });

  useEffect(() => {
    if (location.state !== "undefined" && location.state !== null) {
      setEventDetails(location.state.payload);
      setIsLoggedIn(location.state.isLoggedIn);
    } else {
      fetchEventDetails(eventId.get("id"));
    }
  }, []);

  const fetchEventDetails = (id) => {
    eventsService.getEventById(id)
      .then(onGetEventByIdSuccess)
      .catch(onGetEventByIdError);
    _logger("Fetching details:: ", id);
  };

  const onGetEventByIdSuccess = (response) => {
    _logger("Success on onGetEventById::", response);
    const responseObj = response.data.item;
    setEventDetails({
      id: responseObj.id,
      eventTypeId: responseObj.eventTypeId,
      name: responseObj.name,
      summary: responseObj.summary,
      shortDescription: responseObj.shortDescription,
      venueId: responseObj.venueId,
      eventStatusId: responseObj.eventStatusId,
      imageUrl: responseObj.imageUrl,
      externalSiteUrl: responseObj.externalSiteUrl,
      isFree: responseObj.isFree,
      dateStart: responseObj.dateStart,
      dateEnd: responseObj.dateEnd,
    });
  };

  const onGetEventByIdError = (error) => {
    _logger("Error on onGetEventById::", error);
    toastr.error("Error retrieving event details");
  };

  const eventShowCommentsToggle = () => {
    setShowComments(!showComments);
  };

  const navToEventsList = () => {
    navigate("/eventslist");
  };

  return (
    <React.Fragment>
      <div className="comment-container container rounded">
        <h1 className="comment-header text-center">{eventDetails.name}</h1>
        <div className="container border-top my-3">
          <div className="row">
            <div className="col-8">
              <div className="venue-inner-desc-div font-white">
                <h4 className="mt-2 col-3">Event Name:</h4>
                <p className="card-text fs-1 mt-2 font-white">{eventDetails.name}</p>
              </div>

              <div className="venue-inner-desc-div font-white">
                <h4 className="mt-2 col-3 font-white">Type:</h4>
                <p className="card-text fs-1 mt-2 font-white">
                  {eventDetails.isFree ? "Free" : "Not Free"}
                </p>
              </div>
  
              <div className="venue-inner-desc-div font-white">
                <h4 className="mt-2 col-3 font-white">Description:</h4>
                <p className="card-text fs-1 mt-2 font-white">{eventDetails.shortDescription}</p>
              </div>
  
              <div className="venue-inner-desc-div font-white">
                <h4 className="mt-2 col-3 font-white">Date Start:</h4>
                <p className="card-text fs-1 mt-2 font-white">{new Date(eventDetails.dateStart).toLocaleString()}</p>
              </div>
  
              <div className="venue-inner-desc-div font-white">
                <h4 className="mt-2 col-3 font-white">Date End:</h4>
                <p className="card-text fs-1 mt-2 font-white">{new Date(eventDetails.dateEnd).toLocaleString()}</p>
              </div>
            </div>
            <div className="col-4 venue-inner-desc-div font-white">
              <img
                src={eventDetails.imageUrl}
                alt="eventImage"
                className="mt-4 rounded"
                style={{ maxWidth: "400px", maxHeight: "400px" }} 
              />
            </div>
          </div>
        </div>
        <div className="container btn-container text-center mb-2">
          <button
            className="btn btn-primary mx-3 btn-hover text-light"
            onClick={navToEventsList}
          >
            Events
          </button>
          {isLoggedIn && (
            <div>
              <button
                className="btn btn-link text-light"
                onClick={eventShowCommentsToggle}
              >
                {showComments ? "Hide Comments" : "Show Comments"} 
              </button>
              <div className="mt-2">
                <FontAwesomeIcon icon={showComments ? faAngleUp : faAngleDown} />
              </div>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="venue-inner-desc-comments">
            {showComments && <Comment2 entity={{ entityId: eventDetails.id, entityTypeId: 5 }} />}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

EventsInnerDescription.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EventsInnerDescription;
