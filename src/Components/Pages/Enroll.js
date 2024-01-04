import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import URL from "../../Components/utils.json";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Enroll() {
  const [formErrors, setFormErrors] = useState({});
  const history = useNavigate();

  const validateForm = (formData) => {
    console.log(formData, "validat");
    const errors = {};
    if (!formData.Title) {
      errors.Title = "*Required";
    }
    if (!formData.First_Name) {
      errors.First_Name = "*Required";
    }
    if (!formData.Surname) {
      errors.Surname = "*Required";
    }
    if (!formData.Home_Tel_No) {
      errors.Home_Tel_No = "*Required";
    }
    if (!formData.Mobile_Tel_No) {
      errors.Mobile_Tel_No = "*Required";
    }
    if (!formData.Email) {
      errors.Email = "*Required";
    }
    if (!formData.Insurance_No) {
      errors.Insurance_No = "*Required";
    }
    if (!formData.Postcode) {
      errors.Postcode = "*Required";
    }
    if (!formData.DOB) {
      errors.DOB = "*Required";
    }

    if (!formData.Address) {
      errors.Address = "*Required";
    }
    // if (!formData.Visa_Status) {
    //   errors.Visa_Status = "*Required";
    // }
    // if (!formData.LinkedIn_URL) {
    //   errors.LinkedIn_URL = "*Required";
    // }

    if (
      !formData.Free_to_Takeup_Employment ||
      formData.Free_to_Takeup_Employment === false
    ) {
      errors.Free_to_Takeup_Employment = "*Required";
      if (!formData.No_comments) {
        errors.No_comments = "*Required";
      }
    }
    console.log(formData.Free_to_Takeup_Employment, "tick");
    // Add more validation as needed
    // ...
    console.log(errors, "error");
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var object = {};
    formData.forEach((value, key) => {
      // Convert 'on' or 'off' to true or false for checkboxes
      if (
        [
          "Own_Transport",
          "Driving_License",
          "Free_to_Takeup_Employment",
          "Crimincal_Conviction",
          "Health_Issue",
          "Credit_Check",
          "Data_Protection_Statement",
          "Agree_Ploicy",
        ].includes(key)
      ) {
        object[key] = value === "on" ? true : false;
      } else if (key === "Part_Time_Hour" && isNaN(parseFloat(value))) {
        // Ensure Part_Time_Hour is a number or set it to a default value
        object[key] = 0; // Or any default value you see fit
      } else {
        object[key] = value;
      }
    });
    if (validateForm(object)) {
      const apiUrl = URL.BASE_URL + "/api/seeking-jobs";
      try {
        const FORM_ID = "";
        const FILE = e.target.Signature_Image.files[0];
        if (FILE) {
          const formData2 = new FormData();
          formData2.append("ref", "api::applied-job.applied-job");
          formData2.append("refId", FORM_ID);
          formData2.append("files", FILE);

          await axios.post(URL.BASE_URL + "/api/upload", formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        console.log(object, FORM_ID, "000000001");
        let obj1 = {
          Date: object.Date,
          Organisation: object.Organisation,
          Membership_level_and_No: object.Membership_level_and_No,
        };
        let obj2 = {
          Date: object.Date2,
          Organisation: object.Organisation2,
          Membership_level_and_No: object.Membership_level_and_No2,
        };
        let obj3 = {
          Date: object.Date3,
          Organisation: object.Organisation3,
          Membership_level_and_No: object.Membership_level_and_No3,
        };
        let obj4 = {
          Date: object.Date4,
          Organisation: object.Organisation4,
          Membership_level_and_No: object.Membership_level_and_No4,
        };

        var bodyMemberId1 = await submitAdditionalData(
          obj1,
          FORM_ID,
          "professional-body-memberships"
        );
        var bodyMemberId2 = await submitAdditionalData(
          obj2,
          FORM_ID,
          "professional-body-memberships"
        );
        var bodyMemberId3 = await submitAdditionalData(
          obj3,
          FORM_ID,
          "professional-body-memberships"
        );
        var bodyMemberId4 = await submitAdditionalData(
          obj4,
          FORM_ID,
          "professional-body-memberships"
        );
        var professional_body_memberships = [
          bodyMemberId1,
          bodyMemberId2,
          bodyMemberId3,
          bodyMemberId4,
        ];

        var refObj = {
          Name: object.Name,
          Job_Title: object.Job_Title,
          Company: object.Company,
          Address: object.Address1,
          Telephone_Number: object.Telephone_Number,
          Email: object.Email1,
          Consent_to_Contact: object.Consent_to_Contact === "on" ? true : false,
        };
        var refObj2 = {
          Name: object.Name2,
          Job_Title: object.Job_Title2,
          Company: object.Company2,
          Address: object.Address2,
          Telephone_Number: object.Telephone_Number2,
          Email: object.Email2,
          Consent_to_Contact:
            object.Consent_to_Contact2 === "on" ? true : false,
        };
        // await submitAdditionalData(object, FORM_ID, "reference-details");
        var refId1 = await submitAdditionalData(
          refObj,
          FORM_ID,
          "reference-details"
        );
        var refId2 = await submitAdditionalData(
          refObj2,
          FORM_ID,
          "reference-details"
        );
        console.log(refId1, refId2, "0000002");
        var reference_details = [refId1, refId2];
        object["professional_body_memberships"] = professional_body_memberships;
        object["reference_details"] = reference_details;
        const response = await axios.post(
          apiUrl,
          JSON.stringify({ data: object }),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        ).then(async(res)=>{
          let FORM_ID = res.data.data.id;
          let FILE = e.target.Signature_Image.files[0];
          let FILE2 = e.target.Cover_Letter.files[0];
          let FILE3 = e.target.Resume.files[0];
          if (FILE) {
            const formData2 = new FormData();
            formData2.append("ref", "api::applied-job.applied-job");
            formData2.append("refId", FORM_ID);
            formData2.append("files", FILE);

            await axios.post(URL.BASE_URL + "/api/upload", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }
          if (FILE2) {
            const formData2 = new FormData();
            formData2.append("ref", "api::applied-job.applied-job");
            formData2.append("refId", FORM_ID);
            formData2.append("files", FILE2);

            await axios.post(URL.BASE_URL + "/api/upload", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }
          if (FILE3) {
            const formData2 = new FormData();
            formData2.append("ref", "api::applied-job.applied-job");
            formData2.append("refId", FORM_ID);
            formData2.append("files", FILE3);

            await axios.post(URL.BASE_URL + "/api/upload", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }

        })
        Swal.fire({
          icon: "success",
          title: "Applied!",
          text: "Applied Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        history("/");
        setFormErrors({});
      } catch (error) {
        handleError(error);
      }
    }
  };

  const submitAdditionalData = async (formData, formId, endpoint) => {
    const additionalData = formData[endpoint];
    var id = "";
    if (formData) {
      await axios
        .post(
          URL.BASE_URL + `/api/${endpoint}`,
          {
            data: {
              ...formData,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          id = res.data.data.id;
          console.log(res.data.data.id, "00000res");
          return res.data.data.id;
        });
    }
    return id;
  };

  const handleError = (error) => {
    console.error("An error occurred:", error);
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Form Submission Failed",
      showConfirmButton: true,
    });
  };
  const handleChance = (e) => {
    let error = { ...formErrors };
    let name = e.target.name;
    let value = e.target.value;
    if (value != "") {
      error[name] = null;
    } else {
      error[name] = "*Requred";
    }
    setFormErrors({ ...error });
    console.log(error, "testing");
  };
  return (
    <>
      <Header />
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1
            className="display-2 py-5 text-white"
            style={{ fontFamily: "Alatsi" }}
          >
            ENROLL FOR ANY JOB
          </h1>
        </div>
      </div>
      <div className=" py-5">
        <div className="container">
          <div className="row g-5">
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <form className="row g-3" onSubmit={handleSubmit}>
                <h1
                  className="display mb-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  CANDIDATE PROFILE
                </h1>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Title ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="Title"
                      name="Title"
                      placeholder="Title"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Title">Title</label>
                    {formErrors.Title && (
                      <div className="error-message">{formErrors.Title}</div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.First_Name ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="First_Name"
                      name="First_Name"
                      placeholder="First Name"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="First_Name">First Name</label>
                    {formErrors.First_Name && (
                      <div className="error-message">
                        {formErrors.First_Name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Surname ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="Surname"
                      name="Surname"
                      placeholder="Last Name"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Surname">Last Name</label>
                    {formErrors.Surname && (
                      <div className="error-message">{formErrors.Surname}</div>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Home_Tel_No ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="number"
                      className="form-control"
                      id="Home_Tel_No"
                      name="Home_Tel_No"
                      placeholder="Your home telephone number with country code"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Home_Tel_No">
                      Home Telephone Number (With Country Code - +44712345678)
                    </label>
                    {formErrors.Home_Tel_No && (
                      <div className="error-message">
                        {formErrors.Home_Tel_No}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Mobile_Tel_No ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="number"
                      className="form-control"
                      id="Mobile_Tel_No"
                      name="Mobile_Tel_No"
                      placeholder="Your mobile number with country code"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Mobile_Tel_No">
                      Your Mobile Number (With Country Code - +44712345678)
                    </label>
                    {formErrors.Mobile_Tel_No && (
                      <div className="error-message">
                        {formErrors.Mobile_Tel_No}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Email ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="email"
                      className="form-control"
                      id="Email"
                      name="Email"
                      placeholder="Your Email"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Email">Email Address</label>
                    {formErrors.Email && (
                      <div className="error-message">{formErrors.Email}</div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Insurance_No ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="Insurance_No"
                      name="Insurance_No"
                      placeholder="Insurance_No"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Insurance_No">
                      National Insurance Number
                    </label>
                    {formErrors.Insurance_No && (
                      <div className="error-message">
                        {formErrors.Insurance_No}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Postcode ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="Postcode"
                      name="Postcode"
                      placeholder="Postcode"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Postcode">Postcode</label>

                    {formErrors.Postcode && (
                      <div className="error-message">{formErrors.Postcode}</div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.DOB ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="date"
                      className="form-control"
                      id="DOB"
                      name="DOB"
                      placeholder="DOB"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="DOB">Date of Birth</label>
                    {formErrors.DOB && (
                      <div className="error-message">{formErrors.DOB}</div>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Visa_Status"
                      name="Visa_Status"
                      placeholder="Visa_Status"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Visa_Status">Visa Status</label>
                    {formErrors.Visa_Status && (
                      <div className="error-message">{formErrors.Visa_Status}</div>
                    )}
                  </div>
                </div>

                

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="LinkedIn_URL"
                      name="LinkedIn_URL"
                      placeholder="LinkedIn_URL"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="LinkedIn_URL">LinkedIn URL</label>
                    {formErrors.LinkedIn_URL && (
                      <div className="error-message">{formErrors.LinkedIn_URL}</div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Endorsements"
                      name="Endorsements"
                      placeholder="Endorsements"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Endorsements">Endorsements</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form">
                    <input
                      type="file"
                      className={`form-control ${
                        formErrors.Cover_Letter ? "has-error" : ""
                      }`}
                      id="Cover_Letter"
                      name="Cover_Letter"
                      style={{ border: "1px solid" }}
                    ></input>
                    {formErrors.Cover_Letter && (
                      <div className="error-message">
                        {formErrors.Cover_Letter}
                      </div>
                    )}
                  </div>
                  <label className="mb-3" htmlFor="Cover_Letter">
                    Upload your Cover Letter (Max: 2mb)
                  </label>
                </div>

                <div className="col-sm-6">
                  <div className="form">
                    <input
                      type="file"
                      className={`form-control ${
                        formErrors.Resume ? "has-error" : ""
                      }`}
                      id="Resume"
                      name="Resume"
                      style={{ border: "1px solid" }}
                    ></input>
                    {formErrors.Resume && (
                      <div className="error-message">
                        {formErrors.Resume}
                      </div>
                    )}
                  </div>
                  <label className="mb-3" htmlFor="Resume">
                    Upload your Resume (Max: 2mb)
                  </label>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Emergency_Contact"
                      name="Emergency_Contact"
                      placeholder="Emergency_Contact"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Emergency_Contact">Emergency Contact</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Emergency_Contact_No ? "has-error" : ""
                    }`}
                  >
                    <input
                      type="number"
                      className="form-control"
                      id="Emergency_Contact_No"
                      name="Emergency_Contact_No"
                      placeholder="Your mobile number with country code"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Emergency_Contact_No">
                      Emergency Contact Number (With Country Code -
                      +44712345678)
                    </label>
                    {formErrors.Emergency_Contact_No && (
                      <div className="error-message">
                        {formErrors.Emergency_Contact_No}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Address ? "has-error" : ""
                    }`}
                  >
                    <input
                      onChange={handleChance}
                      type="text"
                      className="form-control"
                      id="Address"
                      name="Address"
                      placeholder="Address"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Address">Address</label>
                    {formErrors.Address && (
                      <div className="error-message">{formErrors.Address}</div>
                    )}{" "}
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Own_Transport"
                      name="Own_Transport"
                    />
                    <label className="form-check-label" htmlFor="Own_Transport">
                      Own Transport
                    </label>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Driving_License"
                      name="Driving_License"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Driving_License"
                    >
                      Driving License
                    </label>
                  </div>
                </div>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Are you free to take up employment in the UK with no current
                  immigration restrictions?
                  <p>
                    In line with Home Office guidance on the prevention of
                    illegal working, we will need to verify and take a copy of
                    your original ID documentation of your right to work in the
                    UK.
                  </p>
                </h6>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Free_to_Takeup_Employment"
                      name="Free_to_Takeup_Employment"
                      onChange={handleChance}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Free_to_Takeup_Employment"
                    >
                      Free To Takeup Employment?
                    </label>
                    {formErrors.Free_to_Takeup_Employment && (
                      <div className="error-message">
                        {formErrors.Free_to_Takeup_Employment}
                      </div>
                    )}
                  </div>
                </div>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  If No, Please provide Details Below.
                </h6>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.No_comments ? "has-error" : ""
                    }`}
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="No_comments"
                      name="No_comments"
                      placeholder="No_comments"
                      style={{ border: "1px solid" }}
                      onChange={handleChance}
                    ></input>
                    <label htmlFor="No_comments">Reason</label>

                    {formErrors.No_comments && (
                      <div className="error-message">
                        {formErrors.No_comments}
                      </div>
                    )}
                  </div>
                </div>
                
                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  POSITIONS SOUGHT
                </h1>
                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Current_Emp_Status ? "has-error" : ""
                    }`}
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="Current_Emp_Status"
                      name="Current_Emp_Status"
                      placeholder="Visa Status"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Current_Emp_Status">
                      Current Employment Status
                    </label>
                    {formErrors.Current_Emp_Status && (
                      <div className="error-message">
                        {formErrors.Current_Emp_Status}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Notice_Period ? "has-error" : ""
                    }`}
                  >
                    <input
                      type="number"
                      className="form-control"
                      id="Notice_Period"
                      name="Notice_Period"
                      placeholder="Notice Period (In Months)"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Notice_Period">
                      Notice Period (In Months)
                    </label>
                    {formErrors.Notice_Period && (
                      <div className="error-message">
                        {formErrors.Notice_Period}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Job_Titles"
                      name="Job_Titles"
                      placeholder="Job_Titles"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Job_Titles">Specify Job Titles</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Preferred_Work_Locations"
                      name="Preferred_Work_Locations"
                      placeholder="Preferred_Work_Locations"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Preferred_Work_Locations">
                      Preferred Locations
                    </label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    className={`form-floating ${
                      formErrors.Job_Type ? "has-error" : ""
                    }`}
                  >
                    <select
                      className="form-select"
                      id="Job_Type"
                      name="Job_Type"
                      style={{ border: "1px solid" }}
                    >
                      <option value="">Select Expected Job Type</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Contract">Contract</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>

                    <label htmlFor="Job_Type">Expected Job Type</label>
                    {formErrors.Job_Type && (
                      <div className="error-message">{formErrors.Job_Type}</div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Part_Time_Hour"
                      name="Part_Time_Hour"
                      placeholder="Part_Time_Hour"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Part_Time_Hour">
                      Time Preferred for Part Time
                    </label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Hourly_Rate"
                      name="Hourly_Rate"
                      placeholder="Hourly_Rate"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Hourly_Rate">
                      Annual Salary / Hourly Rate Expected
                    </label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  PROFESSIONAL BODY MEMBERSHIPS
                </h1>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Organisation"
                      name="Organisation"
                      placeholder="Organisation"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Organisation">Body / Organization</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Membership_level_and_No"
                      name="Membership_level_and_No"
                      placeholder="Membership_level_and_No"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Membership_level_and_No">
                      Membership Level and Number{" "}
                    </label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="Date"
                      name="Date"
                      placeholder="Date"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Date">Date Joined</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Organisation2"
                      name="Organisation2"
                      placeholder="Organisation"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Organisation2">Body / Organization</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Membership_level_and_No2"
                      name="Membership_level_and_No2"
                      placeholder="Membership_level_and_No"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Membership_level_and_No2">
                      Membership Level and Number{" "}
                    </label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="Date2"
                      name="Date2"
                      placeholder="Date"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Date2">Date Joined</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Organisation3"
                      name="Organisation3"
                      placeholder="Organisation"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Organisation3">Body / Organization</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Membership_level_and_No3"
                      name="Membership_level_and_No3"
                      placeholder="Membership_level_and_No"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Membership_level_and_No3">
                      Membership Level and Number{" "}
                    </label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="Date3"
                      name="Date3"
                      placeholder="Date"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Date3">Date Joined</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Organisation4"
                      name="Organisation4"
                      placeholder="Organisation"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Organisation4">Body / Organization</label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Membership_level_and_No4"
                      name="Membership_level_and_No4"
                      placeholder="Membership_level_and_No"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Membership_level_and_No4">
                      Membership Level and Number{" "}
                    </label>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="Date4"
                      name="Date4"
                      placeholder="Date"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Date4">Date Joined</label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  CRIMINAL CONVICTIONS
                </h1>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Do you have any unspent* Criminal Convictions?
                </h6>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Crimincal_Conviction"
                      name="Crimincal_Conviction"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Crimincal_Conviction"
                    >
                      Criminal Convictions?
                    </label>
                  </div>
                </div>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  If Yes, Please provide Details on Convictions.
                </h6>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Convicition_Description"
                      name="Convicition_Description"
                      placeholder="Convicition_Description"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Convicition_Description">
                      Convicition Description
                    </label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  HEALTH & DISABILITY
                </h1>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Do you have any health issues or a relevant disability which
                  may make it difficult for you to carry out functions which are
                  essential for the role you seek??
                </h6>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Health_Issue"
                      name="Health_Issue"
                    />
                    <label className="form-check-label" htmlFor="Health_Issue">
                      Health Issues / Disability?
                    </label>
                  </div>
                </div>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  If Yes, Please Specify. Also, If you have a disability, what
                  are your needs in terms of reasonable adjustments in order to
                  access this recruitment service and to attend interview, or to
                  take aptitude tests etc.? Please specify:
                </h6>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Name_of_Health_Issue"
                      name="Name_of_Health_Issue"
                      placeholder="Name_of_Health_Issue"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Name_of_Health_Issue">
                      Health Issues / Disability
                    </label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Required_Adjustment"
                      name="Required_Adjustment"
                      placeholder="Required_Adjustment"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Required_Adjustment">
                      Reasonable Adjustments Required
                    </label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  CREDIT CHECK REFERENCE
                </h1>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Clients may, in certain circumstances, request a credit check
                  be obtained in addition to your work references. In such
                  cases, you will be made aware that such a check is required.
                  Should such a check be undertaken, please indicate your
                  acceptance by ticking the checkbox here.{" "}
                </h6>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Credit_Check"
                      name="Credit_Check"
                    />
                    <label className="form-check-label" htmlFor="Credit_Check">
                      Credit Check
                    </label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  REFERENCE DETAILS
                </h1>
                {/* 1st employer */}
                <h4
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Current or most recent Employer
                </h4>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      name="Name"
                      placeholder="Name"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Name">Name</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Job_Title"
                      name="Job_Title"
                      placeholder="Job_Title"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Job_Title">Job Title</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Company"
                      name="Company"
                      placeholder="Company"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Company">Company</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Address1"
                      name="Address1"
                      placeholder="Address"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Address1">Address</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="Telephone_Number"
                      name="Telephone_Number"
                      placeholder="Telephone_Number"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Telephone_Number">Telephone Number</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Email1"
                      name="Email1"
                      placeholder="Email"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Email1">Email</label>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Consent_to_Contact"
                      name="Consent_to_Contact"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Consent_to_Contact"
                    >
                      Consent to Contact
                    </label>
                  </div>
                </div>

                {/* second referee */}
                <h4
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Second Referee
                </h4>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Name2"
                      name="Name2"
                      placeholder="Name"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Name2">Name</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Job_Title2"
                      name="Job_Title2"
                      placeholder="Job Title"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Job_Title2">Job Title</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Company2"
                      name="Company2"
                      placeholder="Company"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Company2">Company</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Address2"
                      name="Address2"
                      placeholder="Address"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Address2">Address</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Telephone_Number2"
                      name="Telephone_Number2"
                      placeholder="Telephone_Number"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Telephone_Number2">Telephone Number</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Email2"
                      name="Email2"
                      placeholder="Email"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Email2">Email</label>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Consent_to_Contact2"
                      name="Consent_to_Contact2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Consent_to_Contact2"
                    >
                      Consent to Contact
                    </label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  DATA PROTECTION STATEMENT
                </h1>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  <p>
                    Satchi Recruitment UK Limited provides work-finding services
                    to its clients and candidates. We must process personal data
                    (including sensitive personal data) so that we are able to
                    provide these services – in doing so, we act as a
                    data-controller. This why we have asked for your personal
                    data on this form. When we process your personal data we
                    must do so in accordance with data-protection laws. Those
                    laws require us to give you a Privacy Statement to explain
                    how we manage your personal data. Please see our relevant
                    Privacy Statement attached.
                  </p>
                  <p>
                    Current regulations stipulate that an applicants’ permission
                    must be sought prior to their details being submitted for a
                    vacancy. As a professional Agency, we always endeavour to do
                    this in order that you have full details regarding any
                    opportunity for which we are considering you. There may,
                    however, be rare occasions when a client will introduce a
                    deadline for receipt of application and we are unable to
                    establish contact with you during this time period. In such
                    an instance, would you like us to submit your details for
                    vacancies we feel are appropriate without your prior
                    consent? Please select your preferences from the tick boxes
                    below. This does not commit you to progressing applications
                    you later feel unsuitable once a full verbal brief is
                    provided.
                  </p>
                  In exceptional circumstances, I give permission for my
                  CV/details to be submitted to client(s) without my prior
                  consent for vacancies that meet my requirements as outlined
                  during my initial contact with Satchi Recruitment UK Limited.
                  I understand that, should this occur, Satchi Recruitment UK
                  Ltd will brief me at their earliest opportunity.
                </h6>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Data_Protection_Statement"
                      name="Data_Protection_Statement"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Data_Protection_Statement"
                    >
                      Data Protection & Permission
                    </label>
                  </div>
                </div>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  Please provide your consents below(If any)
                </h6>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Consent_Description"
                      name="Consent_Description"
                      placeholder="Consent_Description"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Consent_Description">Consent</label>
                  </div>
                </div>

                <h1
                  className="display py-3 text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  DECLARATION & WORKING TIME DIRECTIVE OPT-OUT AGREEMENT
                </h1>

                <h6
                  className="display text-black"
                  style={{ fontFamily: "Alatsi" }}
                >
                  <p>
                    I hereby confirm that the information provided in this
                    application is correct. I furthermore understand that if I
                    have made any false claims or have failed to declare
                    information which is discovered at a later date or after
                    appointment, any assignment I am working on may be
                    terminated immediately.
                  </p>
                </h6>
                

                <div className="col-sm-6">
                  <div className="form">
                    <input
                      type="file"
                      className={`form-control ${
                        formErrors.Signature_Image ? "has-error" : ""
                      }`}
                      id="Signature_Image"
                      name="Signature_Image"
                      style={{ border: "1px solid" }}
                    ></input>
                    {formErrors.Signature_Image && (
                      <div className="error-message">
                        {formErrors.Signature_Image}
                      </div>
                    )}
                  </div>
                  <label className="mb-3" htmlFor="Signature_Image">
                    Upload your Signature (Max: 2mb)
                  </label>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="Date_of_Agreement"
                      name="Date_of_Agreement"
                      placeholder="Date_of_Agreement"
                      style={{ border: "1px solid" }}
                    ></input>
                    <label htmlFor="Date_of_Agreement">Date</label>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Agree_Ploicy"
                      name="Agree_Ploicy"
                    />
                    <label className="form-check-label" htmlFor="Agree_Ploicy">
                      I Agree to the Privacy Policy
                    </label>
                  </div>
                </div>

                <div className="col-12 text-center py-5">
                  <button
                    className="btn py-2 rounded-pill text-white"
                    type="submit"
                    style={{ background: "#111727", height: "50px" }}
                  >
                    Apply for Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Enroll;
