import React from "react";

export default function ClaimedTask({ task }) {
  return (
    <tr>
      <td>{task.customerName}</td>
      <td>{task.dropOffAddressId}</td>
      <td>{task.orderId}</td>
      <td>
        <button>Drop off</button>
      </td>
    </tr>
  );
}
