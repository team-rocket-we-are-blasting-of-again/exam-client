import React from "react";

export default function Transaction({ transaction }) {
  const inittr = {
    transactionId: "c0b4b492-0787-4417-8af7-87b8e9339576",
    userEmail: "magda@mail.com",
    amount: 8.0,
    orderId: 10,
  };

  return (
    <tr>
      <td>{transaction.transactionId}</td>
      <td>{transaction.userEmail}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.orderId}</td>     
    </tr>
  );
}
