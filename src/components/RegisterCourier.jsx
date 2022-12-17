import React, { useState } from "react";
import { Row } from "react-bootstrap";
import facade from "../ApiFacade";

export default function RegisterCourier() {
  const initCredantials = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };
  const initMsg = "Register yourself...";
  const [registerCredentials, setRegisterCredentials] =
    useState(initCredantials);
  const [registrationMsg, setRegistrationMsg] = useState(initMsg);

  const onChange = (evt) => {
    setRegistrationMsg(initMsg);
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  const registerCourier = (e) => {
    e.preventDefault();
    if (validateInput()) {
      setRegistrationMsg("Ready to fetch");
      facade
        .registerUser(registerCredentials, "courier")
        .then((d) => {
          setRegistrationMsg(
            <div id="successRegisterCourier">
              Hej, <span id="createdFirstName">{d.firstName}</span>! Your userId is{" "}
              <span id="createdUserId">{d.userId}</span>, and courierId is{" "}
              <span id="createdCourierId">{d.id}</span>
            </div>
          );
          console.log(d);
        })
        .catch((err) => {
          setRegistrationMsg("Ooops! Error status: " + <span id="errorStatus">err.status</span>);
          console.log(err);
        });
    } else {
      setRegistrationMsg("Missing some data");
    }
  };

  const validateInput = () => {
    let valid = true;
    Object.getOwnPropertyNames(registerCredentials).forEach((p) => {
      let v = registerCredentials[p] ? true : false;
      valid = valid && v;
    });
    return valid;
  };

  return (
    <Row>
      <form id="RegisterCourierForm" onChange={onChange}>
        <h5>Sign up</h5>
        <input
          placeholder="First Name"
          required={true}
          type="text"
          id="firstName"
        />
        <input
          placeholder="Last Name"
          required={true}
          type="text"
          id="lastName"
        />
        <input placeholder="Phone" required={true} type="text" id="phone" />
        <input placeholder="E-mail" required={true} type="email" id="email" />
        <input
          placeholder="Password"
          required={true}
          type="password"
          id="password"
        />
        <button id ="registerCourierBtn" onClick={registerCourier}>Register courier</button> <br />
        <div id="registrationMsg">{registrationMsg}</div>
      </form>
    </Row>
  );
}
