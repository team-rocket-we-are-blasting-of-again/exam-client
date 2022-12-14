import React from "react";
import Transaction from "./Transaction";

export default function TransactionBox({ list, theader, float }) {
  return (
    <div
      className={`transaction-box-${float}`}
      style={{ float: float, width: "40%" }}
    >
      <table>
        <thead className="send-button" id={float}>
          <tr>
            <th style={{ color: "green" }}>{theader}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Transaction ID</th>
            <th>User Email</th>
            <th>Total Price</th>
            <th>Order ID</th>
          </tr>
          {list.map((t) => {
            return <Transaction id={t.id} key={t.id} transaction={t} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
