import React, { useEffect, useState } from "react";

export default function Login({ registerRestaurant }) {
  const [loginCredentials, setLoginCredentials] = useState({});

  const performLogin = (evt) => {
    console.log(evt);
    evt.preventDefault();
    if (!loginCredentials.restaurantId) {
      console.log("NO VALUE");
    } else {
      localStorage.setItem("restaurantId", loginCredentials.username);
      registerRestaurant(loginCredentials.restaurantId);
    }
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="container">
      <div>
        <form onChange={onChange}>
          <input
            placeholder="Restaurant ID"
            required={true}
            type="number"
            id="restaurantId"
          />
          <button onClick={performLogin}>connect to orders</button>
        </form>
      </div>
    </div>
  );
}
