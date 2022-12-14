import React, { useState } from "react";

export default function TransactionPost({ registerRestaurant }) {
  const [transactionCredentials, setTransactionCredentials] = useState({});

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionCredentials),
  };

  const postTransaction = (evt) => {
    evt.preventDefault();
    fetch("http://localhost:7077/transaction", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onChange = (evt) => {
    setTransactionCredentials({
      ...transactionCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="container">
      <div className="login">
        <form onChange={onChange}>
          <input
            placeholder="User Email"
            required={true}
            type="text"
            id="userEmail"
          />
          <input
            placeholder="Total Price"
            required={true}
            type="text"
            id="amount"
          />
          <input
            placeholder="Order ID"
            required={true}
            type="text"
            id="orderId"
          />
          <br />
          <button onClick={postTransaction}>Send Transaction</button>
        </form>
      </div>
    </div>
  );
}
