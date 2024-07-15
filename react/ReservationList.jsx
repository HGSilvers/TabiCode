import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reservationService from "../../services/reservationService";
import debug from "sabio-debug";
import "./reservationlist.css";

const _logger = debug.extend("ReservationList");

function ReservationList() {
  const [reservation, setReservation] = useState({
    id: "",
    bookingStatus: {
      id: "",
      name: ""
    },
    table: {
      id: "",
      number: "",
      capacity: ""
    },
    couponCode: "",
    discountValue: "",
    total: "",
    chargeId: "",
    paymentAccountId: "",
    billingAddressId: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = () => {
    reservationService.getById(id)
      .then(response => {
        setReservation(response.data);
        _logger("Reservation fetched successfully:", response.data);
      })
      .catch(error => {
        _logger("Error fetching reservation:", error);
      });
  };

  const handleOrderHistoryClick = () => {
    navigate("/orderhistory");
  };

  return (
    <div className="reservation-list-container">
      <div className="card reservation-card">
        <div className="card-body">
          <h4 className="card-title">Current Reservation</h4>
          {reservation ? (
            <>
              <h6 className="card-subtitle mb-2 text-muted">Reservation ID: {reservation.id || ""}</h6>
              <p className="card-text">Booking Status Name: {reservation.bookingStatus?.name || ""}</p>
              <p className="card-text">Booking Status ID: {reservation.bookingStatus?.id || ""}</p>
              <p className="card-text">Table ID: {reservation.table?.id || ""}</p>
              <p className="card-text">Table Number: {reservation.table?.number || ""}</p>
              <p className="card-text">Table Capacity: {reservation.table?.capacity || ""}</p>
              <p className="card-text">Coupon Code: {reservation.couponCode || ""}</p>
              <p className="card-text">Discount Value: {reservation.discountValue || ""}</p>
              <p className="card-text">Total: {reservation.total || ""}</p>
              <p className="card-text">Charge ID: {reservation.chargeId || ""}</p>
              <p className="card-text">Payment Account ID: {reservation.paymentAccountId || ""}</p>
              <p className="card-text">Billing Address ID: {reservation.billingAddressId || ""}</p>
              <button className="btn btn-warning mt-2" onClick={handleOrderHistoryClick}>Order History</button>
            </>
          ) : (
            <p>Loading reservation data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationList;