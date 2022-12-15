import React, { useEffect, useState } from "react";
import Deliveries from "./AvailableDeliveries";
export default function Login() {
  const initloginCredentials = { password: "", role_id: "" };
  const [loginCredentials, setLoginCredentials] = useState(initloginCredentials);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginCourier = (evt) => {
    evt.preventDefault();
    if (validateInput()) {
      setIsLoggedIn(true);
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
      {isLoggedIn ? <Deliveries /> : "Log in to see deliveries..."}
    </>
  );
}
