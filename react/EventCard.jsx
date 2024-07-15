import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function EventCard({ event, onEditButtonClicked, onDeleteButtonClicked }) {
  const navigate = useNavigate();

  const onViewEventDetails = () => {
    navigate(`/eventsinnerdescription?id=${event.id}`, {
      state: { payload: event, isLoggedIn: true },
    });
  };

  return (
    <div
      key={"ListA-" + event.id}
      className="text-center event-card card col-5"
    >
      <div className="event-card-body card-body">
        <h3 className="event-card-title card-title">{event.name}</h3>
        <p className="event-card-text card-text">{event.summary}</p>
        {event.imageUrl && (
          <img src={event.imageUrl} alt="Event" className="img-fluid" />
        )}
        <button
          type="button"
          className="btn btn-primary event-cards-buttons-margin"
          onClick={onViewEventDetails}
        >
          View Details
        </button>
        <button
          type="button"
          className="btn btn-warning event-cards-buttons-margin"
          onClick={() => onEditButtonClicked(event)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger event-cards-buttons-margin"
          onClick={() => onDeleteButtonClicked(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  onEditButtonClicked: PropTypes.func.isRequired,
  onDeleteButtonClicked: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
