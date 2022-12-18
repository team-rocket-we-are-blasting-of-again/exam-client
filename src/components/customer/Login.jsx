import React, { useState } from "react";
import Deliveries from "./AvailableDeliveries";
import facade from "../../ApiFacade";

export default function Login() {
  const initloginCredentials = { password: "", role_id: "" };
  const [loginCredentials, setLoginCredentials] =
    useState(initloginCredentials);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role_id, setRole_id] = useState();

  const loginCourier = (evt) => {
    evt.preventDefault();
    if (validateInput()) {
      facade
        .login(loginCredentials.email, loginCredentials.password, "courier")
        .then((d) => {
          setIsLoggedIn(true);
          setRole_id(loginCredentials.role_id);
          console.log(d);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  const validateInput = () => {
    let valid = true;
    Object.getOwnPropertyNames(loginCredentials).forEach((p) => {
      let v = loginCredentials[p] ? true : false;
      valid = valid && v;
    });
    return valid;
  };

  return (
    <>
      <form style={{ marginTop: 25 }} onChange={onChange}>
        <h5>Sign in</h5>

        <input
          placeholder="Courier ID"
          required={true}
          type="text"
          id="role_id"
        />
        <input placeholder="Email" required={true} type="email" id="email" />
        <input
          placeholder="Password"
          required={true}
          type="password"
          id="password"
        />
        <button onClick={loginCourier}>Sign in to view Deliveries</button>
      </form>
      <br />
      <br />
      {isLoggedIn ? (
        <Deliveries role_id={role_id} />
      ) : (
        "Log in to see deliveries..."
      )}
    </>
  );
}
