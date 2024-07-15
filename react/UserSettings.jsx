import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import userSettingsSchema from "../../schemas/userSettingsSchema";
import usersService from "../../services/usersService";
import "./usersettings.css";
import debug from "sabio-debug";
import ReservationList from "../Reservation/ReservationList";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("UserSettings");

function UserSettings() {
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        mi: "",
        lastName: "",
        email: "",
        avatarUrl: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        usersService.getCurrentUser()
            .then(response => {
                const userId = response.item.id;
                return usersService.getById(userId);
            })
            .then(response => {
                setInitialValues({
                    firstName: response.item.firstName,
                    mi: response.item.mi,
                    lastName: response.item.lastName,
                    email: response.item.email,
                    avatarUrl: response.item.avatarUrl,
                    password: response.item.password
                });
            })
            .catch(error => {
                _logger("Error retrieving User information: ", error);
            });
    }, []);

    const handleSubmit = (values) => {
        _logger("Submitting event with values:", values);
        setInitialValues(values); 
    };

    const handleChangePasswordClick = () => {
        _logger("Change Password button clicked");
        navigate("/resetpassword");
    };

    return (
        <div className="user-settings-container">
            <h2 className="user-settings-heading">User Settings</h2>
            <div className="user-settings-picture-section">
                <img 
                    src={initialValues.avatarUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} 
                    alt="Profile" 
                    className="user-settings-picture" 
                />
            </div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={userSettingsSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="user-settings-form-group mb-3">
                            <label htmlFor="avatarUrl" className="form-label">Change Profile Pic</label>
                            <Field type="url" name="avatarUrl" className="form-control" id="userAvatarUrl" />
                            <ErrorMessage name="avatarUrl" component="div" className="userfrm-err-msg" />
                        </div>
                        <div className="user-settings-form-row">
                            <div className="user-settings-form-group col-md-4">
                                <label htmlFor="firstName">First Name</label>
                                <Field type="text" name="firstName" className="form-control" placeholder="First Name" />
                                <ErrorMessage name="firstName" component="div" className="userfrm-err-msg" />
                            </div>
                            <div className="user-settings-form-group col-md-4">
                                <label htmlFor="mi">Middle Initial</label>
                                <Field type="text" name="mi" className="form-control" placeholder="Middle Initial" />
                                <ErrorMessage name="mi" component="div" className="userfrm-err-msg" />
                            </div>
                            <div className="user-settings-form-group col-md-4">
                                <label htmlFor="lastName">Last Name</label>
                                <Field type="text" name="lastName" className="form-control" placeholder="Last Name" />
                                <ErrorMessage name="lastName" component="div" className="userfrm-err-msg" />
                            </div>
                        </div>
                        <div className="user-settings-form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="form-control" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="userfrm-err-msg" />
                        </div>
                        <div className="user-settings-form-group">
                            <button 
                                type="button" 
                                className="btn btn-secondary btn-block" 
                                onClick={handleChangePasswordClick}
                            >
                                Change Password
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Update</button>
                    </Form>
                )}
            </Formik>
            <div className="reservation-list-margin">
                <ReservationList />
            </div>
        </div>
    );
}

export default UserSettings;